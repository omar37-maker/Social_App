import { IUser } from "../../Common/Types/interface.types";
import User from "../Models/user.model";
import BaseRepository from "./base.repository";





class UserRepository extends BaseRepository<IUser> { 
    constructor() { 
        super(User)
    }
}

export default UserRepository