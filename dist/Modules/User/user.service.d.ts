import { IUser } from "../../Common/Types";
import { FileService } from "./../../Common/Services";
declare class UserService {
    private fileService;
    constructor(fileService?: FileService);
    uploadProfilePicture(file: Express.Multer.File): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    uploadCoverPictures(files: Express.Multer.File[], user?: IUser): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput[]>;
    renewExpiredUrl(keys: string[]): Promise<{
        key: string;
        url: string;
    }[]>;
    deleteFile(key: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map