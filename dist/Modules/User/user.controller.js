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
const user_service_1 = __importDefault(require("./user.service"));
const Middlewares_1 = require("./../../Middlewares");
const userController = (0, express_1.Router)();
userController.post("/upload-profile", Middlewares_1.upload.single("profile"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });
    const result = yield user_service_1.default.uploadProfilePicture(req.file);
    return res.status(200).json(result);
}));
userController.post("/upload-cover", Middlewares_1.upload.array("cover"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files)
        return res.status(400).json({ message: "No files uploaded" });
    const result = yield user_service_1.default.uploadCoverPictures(req.files);
    return res.status(200).json(result);
}));
userController.post("/renew-expired-url", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keys } = req.body;
    const result = yield user_service_1.default.renewExpiredUrl(keys);
    return res.status(200).json(result);
}));
userController.delete("/delete-file", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key } = req.body;
    const result = yield user_service_1.default.deleteFile(key);
    return res.status(200).json(result);
}));
exports.default = userController;
//# sourceMappingURL=user.controller.js.map