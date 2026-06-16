import { S3Client } from "../Clients/s3.client";
import { BadRequestException } from "../Utils";






export class FileService extends S3Client { 

    async UploadFile(file: Express.Multer.File, key: string) { 
        if (!file || !key) throw new BadRequestException("File and key are required")
        if (!file.mimetype || !file.path) throw new BadRequestException("File mimetype and path are required")

        const filekey = `${key}/${file.filename}`

        return this.putObjectClient(file, filekey)

    }
}

export default FileService