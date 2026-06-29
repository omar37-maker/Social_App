export declare abstract class S3Client {
    private s3Client;
    private bucketName;
    putObjectClient(file: Express.Multer.File, key: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    getSignedUrlClient(key: string, expiresIn?: number): Promise<{
        key: string;
        url: string;
    }>;
    deleteObjectClient(key: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
}
//# sourceMappingURL=s3.client.d.ts.map