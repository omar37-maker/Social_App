import argon2 from "argon2";
import crypto from "node:crypto";
import { envConfig } from "../../config/index";
const encryptionEnv = envConfig.encryption;

class SecurityService {
  private encryptionKey = Buffer.from(encryptionEnv.ENCRYPTION_KEY, "hex");

  encrypt(plainText: string): string {
    // generate iv based on IV_LENGTH
    const iv = crypto.randomBytes(parseInt(encryptionEnv.IV_LENGTH));

    // create cipher object - algo + key + iv
    const cipher = crypto.createCipheriv("aes-256-cbc", this.encryptionKey, iv);

    // update cipher object with plain text encryption
    let encrypted = cipher.update(plainText, "utf-8", "hex");

    // Finalize encryption with .final() to handle padding
    encrypted += cipher.final("hex");

    // return iv in hex string : encrypted data
    return `${iv.toString("hex")}:${encrypted}`;
  }

  decrypt (inputCipher: string): string {
    // split cipher  - [ Iv , encryptedData ]
    const [iv, encryptedData] = inputCipher.split(":");
    const bufferedIv = Buffer.from(iv!, "hex");

    // create decripher object - algo + key + iv
    const decripher = crypto.createDecipheriv(
      "aes-256-cbc",
      this.encryptionKey,
      bufferedIv,
    );

    // update decripher object with encrypted data decryption
    let decrypted: string = decripher.update(encryptedData!, "hex", "utf-8");

    // Finalize decryption with .final() to handle padding
    decrypted += decripher.final("utf-8");

    return decrypted;
  }

  async hash (plainText: string):Promise<string>{
    return argon2.hash(plainText)
  };

  async compare (plainText: string, hashedText: string):Promise<boolean>{
    return argon2.verify(hashedText, plainText)
  };
}

export default SecurityService;
