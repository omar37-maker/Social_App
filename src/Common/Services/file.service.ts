import { S3Client } from "../Clients/s3.client";
import { BadRequestException } from "../Utils";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';






export class FileService extends S3Client { 

    async UploadFile(file: Express.Multer.File, key: string) { 
        if (!file || !key) throw new BadRequestException("File and key are required")
        if (!file.mimetype || !file.path) throw new BadRequestException("File mimetype and path are required")

        const filekey = `${key}/${file.filename}`

        return this.putObjectClient(file, filekey)

    }

    async getSignedUrl(key: string, expiresIn: number = 60) { 
        return this.getSignedUrlClient(key,expiresIn)
    }

    async deleteFile(key: string) { 
        if(!key) throw new BadRequestException("Key is required")
        return this.deleteObjectClient(key)
    }
}

export default FileService