
import { SecurityService, TokenService } from '../../Common/Services';
import { AuthBodyType } from '../../Common/Types';
import { envConfig } from '../../config';
import UserRepository from './../../DB/Repositories/user.repository';

class AuthService { 
    constructor(
        private userRepository: UserRepository = new UserRepository,
        private securityService: SecurityService = new SecurityService(),
        private tokenService: TokenService = new TokenService()
    ){}
    
    health = (body: AuthBodyType) => { 
        const { email, password, phone } = body;
        if (body.phone) { body.phone = this.securityService.encrypt(body.phone) }
        const token = this.tokenService.generateToken({
            payload: body ,
            secret: envConfig.jwt.user.accessSignature,
            options: { expiresIn: parseInt(envConfig.jwt.user.accessExpiration as string) },
        })
        return token
    }
}

export default new AuthService()