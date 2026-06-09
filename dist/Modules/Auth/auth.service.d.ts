import { SecurityService, TokenService } from '../../Common/Services';
import { AuthBodyType } from '../../Common/Types';
import UserRepository from './../../DB/Repositories/user.repository';
declare class AuthService {
    private userRepository;
    private securityService;
    private tokenService;
    constructor(userRepository?: UserRepository, securityService?: SecurityService, tokenService?: TokenService);
    health: (body: AuthBodyType) => string;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map