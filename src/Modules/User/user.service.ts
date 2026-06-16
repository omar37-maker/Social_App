
import { FileService } from './../../Common/Services/file.service';


class UserService { 
    constructor(
        private fileService: FileService = new FileService()
    ) { }

    async uploadProfilePicture(file: Express.Multer.File) { 
        return this.fileService.UploadFile(file, "profiles")
    }
}

export default new UserService(new FileService())