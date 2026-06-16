export declare abstract class S3Client {
    private S3Client;
    private bucketName;
    putObjectClient(file: Express.Multer.File, key: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
}
//# sourceMappingURL=s3.client.d.ts.map