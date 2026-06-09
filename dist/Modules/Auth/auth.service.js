"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../../Common/Services");
const config_1 = require("../../config");
const user_repository_1 = __importDefault(require("./../../DB/Repositories/user.repository"));
class AuthService {
    constructor(userRepository = new user_repository_1.default, securityService = new Services_1.SecurityService(), tokenService = new Services_1.TokenService()) {
        this.userRepository = userRepository;
        this.securityService = securityService;
        this.tokenService = tokenService;
        this.health = (body) => {
            const { email, password, phone } = body;
            if (body.phone) {
                body.phone = this.securityService.encrypt(body.phone);
            }
            const token = this.tokenService.generateToken({
                payload: body,
                secret: config_1.envConfig.jwt.user.accessSignature,
                options: { expiresIn: parseInt(config_1.envConfig.jwt.user.accessExpiration) },
            });
            return token;
        };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map