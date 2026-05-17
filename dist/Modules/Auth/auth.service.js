"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("./../../DB/Repositories/user.repository"));
class AuthService {
    constructor(userRepository = new user_repository_1.default) {
        this.userRepository = userRepository;
        this.health = (body) => {
            return this.userRepository.findDocuments({}, {});
        };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map