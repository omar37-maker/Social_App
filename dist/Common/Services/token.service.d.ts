import { JwtPayload } from "jsonwebtoken";
import { ICreateCredentialsPayload, IDecodedTokenPayload, IDecodedTokenResult, IGenerateTokenPayload, IGetRolePayload, ISignatures, VerifyTokenPayload } from "../Types";
import UserRepository from "../../DB/Repositories/user.repository";
declare class TokenService {
    private userRepository;
    constructor(userRepository?: UserRepository);
    generateToken({ payload, secret, options }: IGenerateTokenPayload): string;
    verifyToken({ token, secret, options }: VerifyTokenPayload): JwtPayload | string;
    createLoginCredentials({ payload, options, requiredToken }: ICreateCredentialsPayload): {
        accessToken: string | undefined;
        refreshToken: string | undefined;
    };
    /**
     * @param { String} token - token to be verfifed
     * @param { Enum } tokenType - referring to toke type if it access or refresh
     * @description decode token and verify it then return the existing user from main db
     * @returns {Object} user - user object
     * @returns {Object} decodedData - decoded data return from verified token
     */
    decodeToken({ token, tokenType }: IDecodedTokenPayload): Promise<IDecodedTokenResult>;
    detectSignatureByRole: ({ role }: {
        role: string;
    }) => {
        accessSignature: string;
        accessExpiration: string | undefined;
        refreshSignature: string;
        refreshExpiration: string | undefined;
    };
    getSignatureByTypeAndRole({ role, tokenType, both }: IGetRolePayload): string | ISignatures;
}
export default TokenService;
//# sourceMappingURL=token.service.d.ts.map