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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const Types_1 = require("../Types");
const Utils_1 = require("../Utils");
const user_repository_1 = __importDefault(require("../../DB/Repositories/user.repository"));
// import { get } from "../Services/redis.service.js";
const jwtSecrets = config_1.envConfig.jwt;
class TokenService {
    constructor(userRepository = new user_repository_1.default()) {
        this.userRepository = userRepository;
        this.detectSignatureByRole = ({ role }) => {
            let signatures;
            if (role == Types_1.USER_ROLES.ADMIN) {
                signatures = jwtSecrets.admin;
            }
            else {
                signatures = jwtSecrets.user;
            }
            return signatures;
        };
    }
    // generate token
    generateToken({ payload, secret, options }) {
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    // verify token
    verifyToken({ token, secret, options }) {
        return jsonwebtoken_1.default.verify(token, secret, options);
    }
    // Create login credentials
    createLoginCredentials({ payload, options, requiredToken }) {
        const signatures = this.getSignatureByTypeAndRole({
            role: payload.role,
            both: true,
        });
        let accessToken, refreshToken;
        switch (requiredToken) {
            case Types_1.TOKEN_TYPES.ACCESS:
                accessToken = this.generateToken({
                    payload,
                    secret: signatures.accessSignature,
                    options: options.access,
                });
                break;
            case Types_1.TOKEN_TYPES.REFRESH:
                refreshToken = this.generateToken({
                    payload,
                    secret: signatures.refreshSignature,
                    options: options.refresh,
                });
                break;
            default:
                accessToken = this.generateToken({
                    payload,
                    secret: signatures.accessSignature,
                    options: options.access,
                });
                refreshToken = this.generateToken({
                    payload,
                    secret: signatures.refreshSignature,
                    options: options.refresh,
                });
                break;
        }
        return { accessToken, refreshToken };
    }
    /**
     * @param { String} token - token to be verfifed
     * @param { Enum } tokenType - referring to toke type if it access or refresh
     * @description decode token and verify it then return the existing user from main db
     * @returns {Object} user - user object
     * @returns {Object} decodedData - decoded data return from verified token
     */
    decodeToken(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token, tokenType }) {
            // decode token to get user role
            const data = jsonwebtoken_1.default.decode(token);
            const role = data === null || data === void 0 ? void 0 : data.role;
            if (!role)
                throw new Utils_1.BadRequestException("invalid payload");
            const signature = this.getSignatureByTypeAndRole({ role, tokenType });
            // verify token
            const decodedData = this.verifyToken({ token, secret: signature });
            const _id = decodedData === null || decodedData === void 0 ? void 0 : decodedData._id;
            if (!_id)
                throw new Utils_1.BadRequestException("invalid payload");
            // check if jti is blacklisted
            // const isBlackListed = await get({
            //   key: `bl_${tokenType}_${decodedData.jti}`,
            // });
            // if (isBlackListed)
            //   throw new BadRequestException("Your session is ended . login again");
            const user = yield this.userRepository.findDocumentById(_id);
            if (!user)
                throw new Utils_1.NotFoundException("user not found");
            return { user, decodedData };
        });
    }
    ;
    getSignatureByTypeAndRole({ role, tokenType, both = false }) {
        const signatures = this.detectSignatureByRole({ role });
        if (both)
            return signatures;
        let tokenSignature;
        switch (tokenType) {
            case Types_1.TOKEN_TYPES.ACCESS:
                tokenSignature = signatures.accessSignature;
                break;
            case Types_1.TOKEN_TYPES.REFRESH:
                tokenSignature = signatures.refreshSignature;
                break;
            default:
                throw new Utils_1.BadRequestException("invalid token type");
        }
        return tokenSignature;
    }
    ;
}
exports.default = TokenService;
//# sourceMappingURL=token.service.js.map