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
const argon2_1 = __importDefault(require("argon2"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const index_1 = require("../../config/index");
const encryptionEnv = index_1.envConfig.encryption;
class SecurityService {
    constructor() {
        this.encryptionKey = Buffer.from(encryptionEnv.ENCRYPTION_KEY, "hex");
    }
    encrypt(plainText) {
        // generate iv based on IV_LENGTH
        const iv = node_crypto_1.default.randomBytes(parseInt(encryptionEnv.IV_LENGTH));
        // create cipher object - algo + key + iv
        const cipher = node_crypto_1.default.createCipheriv("aes-256-cbc", this.encryptionKey, iv);
        // update cipher object with plain text encryption
        let encrypted = cipher.update(plainText, "utf-8", "hex");
        // Finalize encryption with .final() to handle padding
        encrypted += cipher.final("hex");
        // return iv in hex string : encrypted data
        return `${iv.toString("hex")}:${encrypted}`;
    }
    decrypt(inputCipher) {
        // split cipher  - [ Iv , encryptedData ]
        const [iv, encryptedData] = inputCipher.split(":");
        const bufferedIv = Buffer.from(iv, "hex");
        // create decripher object - algo + key + iv
        const decripher = node_crypto_1.default.createDecipheriv("aes-256-cbc", this.encryptionKey, bufferedIv);
        // update decripher object with encrypted data decryption
        let decrypted = decripher.update(encryptedData, "hex", "utf-8");
        // Finalize decryption with .final() to handle padding
        decrypted += decripher.final("utf-8");
        return decrypted;
    }
    hash(plainText) {
        return __awaiter(this, void 0, void 0, function* () {
            return argon2_1.default.hash(plainText);
        });
    }
    ;
    compare(plainText, hashedText) {
        return __awaiter(this, void 0, void 0, function* () {
            return argon2_1.default.verify(hashedText, plainText);
        });
    }
    ;
}
//# sourceMappingURL=security.service.js.map