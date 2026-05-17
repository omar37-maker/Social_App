import UserRepository from './../../DB/Repositories/user.repository';
declare class AuthService {
    private userRepository;
    constructor(userRepository?: UserRepository);
    health: (body: object) => Promise<import("../../Common/Types/interface.types").IUser[]>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map