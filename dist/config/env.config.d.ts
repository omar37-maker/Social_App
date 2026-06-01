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
};
export default envConfig;
//# sourceMappingURL=env.config.d.ts.map