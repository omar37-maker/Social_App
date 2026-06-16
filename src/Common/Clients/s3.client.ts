
import { S3Client as AwsS3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { envConfig } from "../../config";
import fs from "fs"
import { Multer} from "multer"
const s3Config = envConfig.s3

export abstract class S3Client { 
    private S3Client = new AwsS3Client({
        region: s3Config.region,
        credentials: {
            accessKeyId: s3Config.accessKeyId,
            secretAccessKey: s3Config.secretAccessKey
        }
    })
    private  bucketName = s3Config.bucketName

    async putObjectClient(file: Express.Multer.File, key:string) { 
        const filekey = `${key}/${file.filename}`

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        })
        return this.S3Client.send(command)
    }
}