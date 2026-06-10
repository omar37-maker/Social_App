import { IUser } from "../../Common/Types/interface.types";
import BaseRepository from "./base.repository";
declare class UserRepository extends BaseRepository<IUser> {
    constructor();
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserByPhoneNumber(phoneNumber: string): Promise<IUser | null>;
}
export default UserRepository;
//# sourceMappingURL=user.repository.d.ts.map