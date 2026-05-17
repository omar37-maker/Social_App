
import UserRepository from './../../DB/Repositories/user.repository';


class AuthService { 
    constructor(
        private userRepository : UserRepository = new UserRepository
    ) { }
    
    health = (body: object) => { 
        return this.userRepository.findDocuments({}, {})
    }
}

export default new AuthService()