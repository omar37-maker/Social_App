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
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const Middlewares_1 = require("../../Middlewares");
const auth_validators_1 = require("../../validators/auth.validators");
const authController = (0, express_1.Router)();
authController.get("/health", (0, Middlewares_1.responseFormatter)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = auth_service_1.default.health();
    return { message: "Health check successful", data: result, meta: { statusCode: 201 } };
})));
authController.post("/signup", (0, Middlewares_1.validation)(auth_validators_1.SignUpSchema), (0, Middlewares_1.responseFormatter)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.SignUp(req.body);
    return { message: "User created successfully", data: result, meta: { statusCode: 201 } };
})));
authController.post("/signin", (0, Middlewares_1.validation)(auth_validators_1.SignInSchema), (0, Middlewares_1.responseFormatter)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.SignIn(req.body);
    return { message: "User signed in successfully", data: result, meta: { statusCode: 201 } };
})));
authController.get("/users", (0, Middlewares_1.responseFormatter)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.listUsers();
    return { message: "User fetched  successfully", data: result, meta: { statusCode: 201 } };
})));
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map