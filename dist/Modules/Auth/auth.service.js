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
const Services_1 = require("../../Common/Services");
const Utils_1 = require("../../Common/Utils");
const config_1 = require("../../config");
const user_repository_1 = __importDefault(require("./../../DB/Repositories/user.repository"));
const jwtSecrets = config_1.envConfig.jwt;
class AuthService {
    constructor(userRepository = new user_repository_1.default(), securityService = new Services_1.SecurityService(), tokenService = new Services_1.TokenService()) {
        this.userRepository = userRepository;
        this.securityService = securityService;
        this.tokenService = tokenService;
        this.health = () => {
            return 1;
        };
        this.SignUp = (body) => __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, phoneNumber, age, gender, workExperience } = body;
            yield this._chechDuplication(body);
            return this.userRepository.createDocument({ firstName, lastName, email, password, phoneNumber, age, gender, workExperience });
        });
        this.SignIn = (body) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const user = yield this.userRepository.findOneDocument({ email });
            if (!user) {
                throw new Utils_1.BadRequestException("Invalid credentials");
            }
            const isPasswordValid = yield this.securityService.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Utils_1.BadRequestException("Invalid Credentials");
            }
            return this._buildTokens(user);
        });
        this.listUsers = () => this.userRepository.findDocuments({});
    }
    _chechDuplication(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phoneNumber } = body;
            const emailExists = yield this.userRepository.findUserByEmail(email);
            if (emailExists) {
                throw new Utils_1.ConflictException("Email already exists", {
                    duplicateField: "email",
                    duplicateValue: email,
                });
            }
            if (phoneNumber) {
                const phoneExist = yield this.userRepository.findUserByPhoneNumber(phoneNumber);
                if (phoneExist) {
                    throw new Utils_1.ConflictException("phone number already exists", {
                        duplicateField: "phoneNumber",
                        duplicateValue: phoneNumber,
                    });
                }
            }
        });
    }
    // async _prepareData(body: SignUpBodyType) {
    //             const { firstName, lastName, email, password, phoneNumber, age, gender, workExperience } = body
    //     // let encryptedPhone
    //     // if (phoneNumber) {
    //     //     encryptedPhone = this.securityService.encrypt(phoneNumber);
    //     // }
    //     // const hashedPassword = await this.securityService.hash(password)
    //     return {
    //         firstName,
    //         lastName,
    //         email,
    //         password: hashedPassword,
    //         phoneNumber: encryptedPhone,
    //         age,
    //         gender,
    //         workExperience
    //     }
    // }
    _buildTokens(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPayload = { _id: data._id, email: data.email, role: data.role };
            const { accessToken, refreshToken } = this.tokenService.createLoginCredentials({
                payload: tokenPayload,
                options: {
                    access: {
                        expiresIn: jwtSecrets[data.role].accessExpiration,
                        jwtid: crypto.randomUUID()
                    },
                    refresh: {
                        expiresIn: jwtSecrets[data.role].refreshExpiration,
                    }
                }
            });
            return { accessToken, refreshToken };
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map