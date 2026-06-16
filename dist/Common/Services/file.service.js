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
exports.FileService = void 0;
const s3_client_1 = require("../Clients/s3.client");
const Utils_1 = require("../Utils");
class FileService extends s3_client_1.S3Client {
    UploadFile(file, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file || !key)
                throw new Utils_1.BadRequestException("File and key are required");
            if (!file.mimetype || !file.path)
                throw new Utils_1.BadRequestException("File mimetype and path are required");
            const filekey = `${key}/${file.filename}`;
            return this.putObjectClient(file, filekey);
        });
    }
}
exports.FileService = FileService;
exports.default = FileService;
//# sourceMappingURL=file.service.js.map