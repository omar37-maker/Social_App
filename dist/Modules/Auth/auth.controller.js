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
const authController = (0, express_1.Router)();
authController.get("/health", (0, Middlewares_1.responseFormatter)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.health(req.body);
    return { message: "User registered successfully", data: result, meta: { statusCode: 201 } };
})));
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map