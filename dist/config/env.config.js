"use strict";
var _a, _b, _c, _d, _e;
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
        ENCRYPTION_KEY: (_d = process.env.SECRET_KEY) !== null && _d !== void 0 ? _d : "",
        IV_LENGTH: (_e = process.env.IV_LENGTH) !== null && _e !== void 0 ? _e : "16",
    },
};
exports.default = envConfig;
//# sourceMappingURL=env.config.js.map