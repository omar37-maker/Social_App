declare const envConfig: {
    app: {
        port: string | number;
        nodeEnv: string;
    };
    database: {
        MONGO_URI: string;
    };
    encryption: {
        ENCRYPTION_KEY: string;
        IV_LENGTH: string;
    };
    jwt: {
        user: {
            accessSignature: string;
            accessExpiration: string | undefined;
            refreshSignature: string;
            refreshExpiration: string | undefined;
        };
        admin: {
            accessSignature: string;
            accessExpiration: string | undefined;
            refreshSignature: string;
            refreshExpiration: string | undefined;
        };
    };
    cors: {
        whiteListedOrigins: string[] | undefined;
    };
    gcp: {
        webClientId: string | undefined;
    };
    redis: {
        url: string;
    };
    emails: {
        service: string | undefined;
        user: string | undefined;
        pass: string | undefined;
    };
    s3: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        bucketName: string;
    };
};
export default envConfig;
//# sourceMappingURL=env.config.d.ts.map