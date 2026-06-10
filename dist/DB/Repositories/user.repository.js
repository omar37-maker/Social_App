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
const user_model_1 = __importDefault(require("../Models/user.model"));
const base_repository_1 = __importDefault(require("./base.repository"));
class UserRepository extends base_repository_1.default {
    constructor() {
        super(user_model_1.default);
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOneDocument({ email }, { email: 1 });
        });
    }
    findUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOneDocument({ phoneNumber }, { phoneNumber: 1 });
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map