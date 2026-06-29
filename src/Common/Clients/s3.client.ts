
import { S3Client as AwsS3Client, Bucket$, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { envConfig } from "../../config";
import fs from "fs"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3Config = envConfig.s3

export abstract class S3Client { 
    private s3Client = new AwsS3Client({
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
        return this.s3Client.send(command)
    }

    async getSignedUrlClient(key: string, expiresIn: number = 60) { 
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })

        const url = await getSignedUrl(this.s3Client, command, { expiresIn })
        return {key,url}
    }

    async deleteObjectClient(key: string) { 
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })
        return this.s3Client.send(command)
    }
}