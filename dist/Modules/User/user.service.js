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
const file_service_1 = require("./../../Common/Services/file.service");
class UserService {
    constructor(fileService = new file_service_1.FileService()) {
        this.fileService = fileService;
    }
    uploadProfilePicture(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fileService.UploadFile(file, "profiles");
        });
    }
}
exports.default = new UserService(new file_service_1.FileService());
//# sourceMappingURL=user.service.js.map