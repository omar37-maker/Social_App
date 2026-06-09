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
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Common/Utils");
const validation = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const validationErrors = [];
        for (const key in schema) {
            const validkey = key;
            const result = (_a = schema[validkey]) === null || _a === void 0 ? void 0 : _a.safeParse(req[validkey]);
            console.log(key, result);
            if (!(result === null || result === void 0 ? void 0 : result.success)) {
                validationErrors.push(result === null || result === void 0 ? void 0 : result.error.issues);
            }
        }
        if (validationErrors.length)
            throw new Utils_1.BadRequestException("validation error", validationErrors);
        next();
    });
};
exports.default = validation;
//# sourceMappingURL=validation.middleware.js.map