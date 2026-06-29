"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../../config");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Config = config_1.envConfig.s3;
class S3Client {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.accessKeyId,
                secretAccessKey: s3Config.secretAccessKey
            }
        });
        this.bucketName = s3Config.bucketName;
    }
    putObjectClient(file, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const filekey = `${key}/${file.filename}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            });
            return this.s3Client.send(command);
        });
    }
    getSignedUrlClient(key_1) {
        return __awaiter(this, arguments, void 0, function* (key, expiresIn = 60) {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: key
            });
            const url = yield (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            return { key, url };
        });
    }
    deleteObjectClient(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key
            });
            return this.s3Client.send(command);
        });
    }
}
exports.S3Client = S3Client;
//# sourceMappingURL=s3.client.js.map