declare class SecurityService {
    private encryptionKey;
    encrypt(plainText: string): string;
    decrypt(inputCipher: string): string;
    hash(plainText: string): Promise<string>;
    compare(plainText: string, hashedText: string): Promise<boolean>;
}
export default SecurityService;
//# sourceMappingURL=security.service.d.ts.map