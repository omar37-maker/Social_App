import { IUser } from "../../Common/Types";
import { FileService } from "./../../Common/Services";

class UserService {
  constructor(private fileService: FileService = new FileService()) {}

  async uploadProfilePicture(file: Express.Multer.File) {
    return this.fileService.UploadFile(file, "Profiles");
  }

  async uploadCoverPictures(files: Express.Multer.File[], user?: IUser) {
    return Promise.all(
      files.map((file) => this.fileService.UploadFile(file, "Covers")),
    );
  }

  async renewExpiredUrl(keys: string[]) {
    return Promise.all(
      keys.map((key) => this.fileService.getSignedUrl(key, 60)),
    );
  }

  async deleteFile(key: string) {
    return this.fileService.deleteFile(key);
  }
}

export default new UserService(new FileService());
