
import { email } from 'zod';
import { SecurityService, TokenService } from '../../Common/Services';
import { IUser, SignInBodyType, SignUpBodyType } from '../../Common/Types';
import { BadRequestException, ConflictException } from '../../Common/Utils';
import { envConfig } from '../../config';
import UserRepository from './../../DB/Repositories/user.repository';
import { JwtPayload, SignOptions } from 'jsonwebtoken';

const jwtSecrets = envConfig.jwt

class AuthService {
    constructor(
        private userRepository: UserRepository = new UserRepository(),
        private securityService: SecurityService = new SecurityService(),
        private tokenService: TokenService = new TokenService()
    ) { }

    health = () => {
        return 1
    }

    async _chechDuplication(body: SignUpBodyType) {
        const { email, phoneNumber } = body;
        const emailExists = await this.userRepository.findUserByEmail(email);
        if (emailExists) {
            throw new ConflictException("Email already exists", {
                duplicateField: "email",
                duplicateValue: email,
            });
        }
        if (phoneNumber) {
            const phoneExist =
                await this.userRepository.findUserByPhoneNumber(phoneNumber);
            if (phoneExist) {
                throw new ConflictException("phone number already exists", {
                    duplicateField: "phoneNumber",
                    duplicateValue: phoneNumber,
                });
            }
        }


    }

    // async _prepareData(body: SignUpBodyType) {
    //             const { firstName, lastName, email, password, phoneNumber, age, gender, workExperience } = body

    //     // let encryptedPhone
    //     // if (phoneNumber) {
    //     //     encryptedPhone = this.securityService.encrypt(phoneNumber);

    //     // }

    //     // const hashedPassword = await this.securityService.hash(password)
    //     return {
    //         firstName,
    //         lastName,
    //         email,
    //         password: hashedPassword,
    //         phoneNumber: encryptedPhone,
    //         age,
    //         gender,
    //         workExperience
    //     }
    // }


    async _buildTokens (data: Pick<IUser, "_id" | "email" | "role">){

        const tokenPayload = { _id: data._id, email: data.email, role: data.role }
        const { accessToken, refreshToken } = this.tokenService.createLoginCredentials({
            payload: tokenPayload,
            options: {
                access: {
                    expiresIn: jwtSecrets[data.role].accessExpiration as SignOptions["expiresIn"],
                    jwtid:crypto.randomUUID()
                },
                refresh: {
                    expiresIn:jwtSecrets[data.role].refreshExpiration as SignOptions["expiresIn"],
                }
            }
        })

        return {accessToken, refreshToken}
    }

    SignUp = async (body: SignUpBodyType) => { 
        const { firstName, lastName, email, password, phoneNumber, age, gender, workExperience } = body


        await this._chechDuplication(body)

        return this.userRepository.createDocument({ firstName, lastName, email, password, phoneNumber, age, gender, workExperience } );
  
    }

    SignIn = async (body: SignInBodyType) => { 
        const { email, password } = body

        const user = await this.userRepository.findOneDocument({email})
        if (!user) { 
            throw new BadRequestException("Invalid credentials")
        }

        const isPasswordValid = await this.securityService.compare(password, user.password)
        if (!isPasswordValid) { 
            throw new BadRequestException("Invalid Credentials")
        }

        return this._buildTokens(user)
    }

    listUsers = () => this.userRepository.findDocuments({})

}

export default new AuthService()