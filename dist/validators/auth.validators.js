"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Types_1 = require("../Common/Types");
exports.SignUpSchema = {
    body: zod_1.default.object({
        firstName: zod_1.default.string().min(3, { error: "first name must be at least 3 characters long" }),
        lastName: zod_1.default.string().min(3, { error: "last name must be at least 3 characters long" }),
        email: zod_1.default.email({ error: "email must be a valid email" }),
        password: zod_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        confirm: zod_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        phoneNumber: zod_1.default.string().optional(),
        gender: zod_1.default.enum(Types_1.GENDER),
        age: zod_1.default.number().gt(18, { error: "age must be greater than 18" }),
        workExperience: zod_1.default.array(zod_1.default.object({
            company: zod_1.default.string(),
            position: zod_1.default.string(),
            startDate: zod_1.default.iso.date(),
            endDate: zod_1.default.iso.date(),
            currentlyWorking: zod_1.default.boolean(),
        })).optional()
    }).superRefine((val, cxt) => {
        var _a;
        if (val.password !== val.confirm) {
            cxt.addIssue({
                message: "Please confirm must be equal to password",
                path: ["confirm"],
                code: "custom"
            });
        }
        if ((_a = val.workExperience) === null || _a === void 0 ? void 0 : _a.length) {
            val.workExperience.forEach((workExperience, index) => {
                if (!workExperience.currentlyWorking && !workExperience.endDate) {
                    cxt.addIssue({
                        message: "end date is required for work experience",
                        path: ["workExperience", index, "endDate"],
                        code: "custom"
                    });
                }
                if (workExperience.endDate && workExperience.endDate < workExperience.startDate) {
                    cxt.addIssue({
                        message: "end date must be after start date",
                        path: ["workExperience", index, "endDate"],
                        code: "custom"
                    });
                }
            });
        }
    })
};
exports.SignInSchema = {
    body: zod_1.default.object({
        email: zod_1.default.email({ error: "email must be a valid email" }),
        password: zod_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    })
};
//# sourceMappingURL=auth.validators.js.map