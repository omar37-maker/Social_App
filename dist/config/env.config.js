"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: [`.${process.env.NODE_ENV}.env`, ".env"],
});
const envConfig = {
    app: {
        port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000,
        nodeEnv: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : "dev",
    },
    database: {
        MONGO_URI: (_c = process.env.MONGO_URI) !== null && _c !== void 0 ? _c : "mongodb://localhost:27017/social_app",
    },
    encryption: {
        ENCRYPTION_KEY: (_d = process.env.ENC_KEY) !== null && _d !== void 0 ? _d : "c50fbab25815764e774ee85e9e705c65071892f0e6fab102c99226fac4cb5df2",
        IV_LENGTH: (_e = process.env.ENC_IV_LENGTH) !== null && _e !== void 0 ? _e : "16",
    },
    jwt: {
        user: {
            accessSignature: (_f = process.env.JWT_ACCESS_SECRET_USER) !== null && _f !== void 0 ? _f : "user_access_test",
            accessExpiration: process.env.JWT_ACCESS_EXP_USER,
            refreshSignature: (_g = process.env.JWT_REFRESH_SECRET_USER) !== null && _g !== void 0 ? _g : "user_refresh_test",
            refreshExpiration: process.env.JWT_REFRESH_EXP_USER,
        },
        admin: {
            accessSignature: (_h = process.env.JWT_ACCESS_SECRET_ADMIN) !== null && _h !== void 0 ? _h : "admin_access_test",
            accessExpiration: process.env.JWT_ACCESS_EXP_ADMIN,
            refreshSignature: (_j = process.env.JWT_REFRESH_SECRET_ADMIN) !== null && _j !== void 0 ? _j : "admin_refresh_test",
            refreshExpiration: process.env.JWT_REFRESH_EXP_ADMIN,
        },
    },
    cors: {
        whiteListedOrigins: (_k = process.env.CORS_WHITELISTED_ORIGINS) === null || _k === void 0 ? void 0 : _k.split(","),
    },
    gcp: {
        webClientId: process.env.GCP_CLIENT_ID,
    },
    redis: {
        url: process.env.REDIS_URL || "redis://localhost:6379",
    },
    emails: {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    s3: {
        accessKeyId: (_l = process.env.AWS_ACCESS_KEY_ID) !== null && _l !== void 0 ? _l : "",
        secretAccessKey: (_m = process.env.AWS_SECRET_ACCESS_KEY) !== null && _m !== void 0 ? _m : "",
        region: (_o = process.env.AWS_REGION) !== null && _o !== void 0 ? _o : "",
        bucketName: (_p = process.env.AWS_BUCKET_NAME) !== null && _p !== void 0 ? _p : ""
    }
};
exports.default = envConfig;
//# sourceMappingURL=env.config.js.map