import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config";
import { ICreateCredentialsPayload, IDecodedTokenPayload, IDecodedTokenResult, IGenerateTokenPayload, IGetRolePayload, ISignatures, IUser, TOKEN_TYPES, USER_ROLES, VerifyTokenPayload } from "../Types";
import { BadRequestException, NotFoundException } from "../Utils";
import UserRepository from "../../DB/Repositories/user.repository";
// import { get } from "../Services/redis.service.js";
const jwtSecrets = envConfig.jwt;




class TokenService {

    constructor(
        private userRepository: UserRepository = new UserRepository()
    ) {}


  // generate token
  generateToken({ payload, secret, options }:IGenerateTokenPayload):string {
    return jwt.sign(payload, secret, options);
  }

  // verify token
  verifyToken({ token, secret, options }:VerifyTokenPayload):JwtPayload | string {
    return jwt.verify(token, secret, options);
  }

  // Create login credentials
  createLoginCredentials({ payload, options, requiredToken }:ICreateCredentialsPayload) {
    const signatures: ISignatures | string = this.getSignatureByTypeAndRole({
      role: (payload as { role: string }).role,
      both: true,
    }as IGetRolePayload)as ISignatures;

    let accessToken, refreshToken;
    switch (requiredToken) {
      case TOKEN_TYPES.ACCESS:
        accessToken = this.generateToken({
          payload,
          secret: signatures.accessSignature,
          options: options.access,
        });
        break;
      case TOKEN_TYPES.REFRESH:
        refreshToken = this.generateToken({
          payload,
          secret: signatures.refreshSignature,
          options: options.refresh,
        });
        break;
      default:
        accessToken = this.generateToken({
          payload,
          secret: signatures.accessSignature,
          options: options.access,
        });
        refreshToken = this.generateToken({
          payload,
          secret: signatures.refreshSignature,
          options: options.refresh,
        });
        break;
    }

    return { accessToken, refreshToken };
  }

  /**
   * @param { String} token - token to be verfifed
   * @param { Enum } tokenType - referring to toke type if it access or refresh
   * @description decode token and verify it then return the existing user from main db
   * @returns {Object} user - user object
   * @returns {Object} decodedData - decoded data return from verified token
   */
  async decodeToken({ token, tokenType }: IDecodedTokenPayload): Promise<IDecodedTokenResult> {
    // decode token to get user role
      const data = jwt.decode(token);
    const role = (data as { role: string })?.role;
    if (!role)
      throw new BadRequestException("invalid payload")
    
    const signature: string = this.getSignatureByTypeAndRole({ role, tokenType }as IGetRolePayload) as string;

    // verify token
      const decodedData = this.verifyToken({ token, secret: signature });
    const _id = (decodedData as IUser)?._id;
    if (!_id)
      throw new BadRequestException("invalid payload")

    // check if jti is blacklisted
    // const isBlackListed = await get({
    //   key: `bl_${tokenType}_${decodedData.jti}`,
    // });
    // if (isBlackListed)
    //   throw new BadRequestException("Your session is ended . login again");

      const user: IUser | null = await this.userRepository.findDocumentById(_id);
    if(!user) throw new NotFoundException("user not found");
    return { user, decodedData };
  };

  detectSignatureByRole = ({ role }: { role: string }) => {
    let signatures;
    if (role == USER_ROLES.ADMIN) {
      signatures = jwtSecrets.admin;
    } else {
      signatures = jwtSecrets.user;
    }

    return signatures;
  };

  getSignatureByTypeAndRole ({ role, tokenType, both = false }: IGetRolePayload): string | ISignatures {
    const signatures = this.detectSignatureByRole({ role });

    if (both) return signatures;

    let tokenSignature;
    switch (tokenType) {
      case TOKEN_TYPES.ACCESS:
        tokenSignature = signatures.accessSignature;
        break;
      case TOKEN_TYPES.REFRESH:
        tokenSignature = signatures.refreshSignature;
        break;
      default:
        throw new BadRequestException("invalid token type");
    }
    return tokenSignature;
  };
}

export default TokenService;




