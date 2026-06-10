import { SecurityService, TokenService } from '../../Common/Services';
import { IUser, SignInBodyType, SignUpBodyType } from '../../Common/Types';
import UserRepository from './../../DB/Repositories/user.repository';
declare class AuthService {
    private userRepository;
    private securityService;
    private tokenService;
    constructor(userRepository?: UserRepository, securityService?: SecurityService, tokenService?: TokenService);
    health: () => number;
    _chechDuplication(body: SignUpBodyType): Promise<void>;
    _buildTokens(data: Pick<IUser, "_id" | "email" | "role">): Promise<{
        accessToken: string | undefined;
        refreshToken: string | undefined;
    }>;
    SignUp: (body: SignUpBodyType) => Promise<IUser>;
    SignIn: (body: SignInBodyType) => Promise<{
        accessToken: string | undefined;
        refreshToken: string | undefined;
    }>;
    listUsers: () => Promise<IUser[]>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map