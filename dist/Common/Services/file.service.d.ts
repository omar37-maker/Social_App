import { S3Client } from "../Clients/s3.client";
export declare class FileService extends S3Client {
    UploadFile(file: Express.Multer.File, key: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
}
export default FileService;
//# sourceMappingURL=file.service.d.ts.map