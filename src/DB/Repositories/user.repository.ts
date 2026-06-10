import { IUser } from "../../Common/Types/interface.types";
import User from "../Models/user.model";
import BaseRepository from "./base.repository";





class UserRepository extends BaseRepository<IUser> { 
    constructor() { 
        super(User)
    }

    async findUserByEmail(email: string) { 
        return this.findOneDocument({ email }, { email: 1 })
        
    }

    async findUserByPhoneNumber(phoneNumber: string) { 
        return this.findOneDocument({ phoneNumber }, { phoneNumber: 1 })
        
    }
}

export default UserRepository