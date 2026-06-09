"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Types_1 = require("../Common/Types");
const mongoose_1 = require("mongoose");
exports.AuthSchema = {
    body: zod_1.default.object({
        email: zod_1.default.email({ error: "email must be a valid email" }),
        password: zod_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        confirm: zod_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        phone: zod_1.default.string().optional(),
        gender: zod_1.default.enum(Types_1.GENDER),
        userId: zod_1.default.string(),
        age: zod_1.default.number().gt(18, { error: "age must be greater than 18" })
    }).superRefine((val, cxt) => {
        if (val.password !== val.confirm) {
            cxt.addIssue({
                message: "Please confirm must be equal to password",
                path: ["confirm"],
                code: "custom"
            });
        }
        if (!(0, mongoose_1.isValidObjectId)(val.userId)) {
            cxt.addIssue({
                message: "invalid Id",
                path: ["userId"],
                code: "custom"
            });
        }
    })
    //   .refine((data) => data.password === data.confirm,
    //   {
    //       error: "Please confirm must be equal to password",
    //       path: ["confirm"]
    //   }).refine((data) => isValidObjectId(data.userId), {error: "invalid ObjectId"})
};
//# sourceMappingURL=auth.validators.js.map