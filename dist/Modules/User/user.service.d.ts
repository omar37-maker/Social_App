import { FileService } from './../../Common/Services/file.service';
declare class UserService {
    private fileService;
    constructor(fileService?: FileService);
    uploadProfilePicture(file: Express.Multer.File): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map