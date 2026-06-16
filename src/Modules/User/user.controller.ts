import { Router } from "express";
import userService from "./user.service";
import { upload } from './../../Middlewares';

const userController = Router();

userController.post("/upload-profile", upload.single("profile"), async (req, res) => { 
    if (!req.file) return res.status(400).json({message: "No file uploaded"})
    const result = await userService.uploadProfilePicture(req.file!)
})
export default userController;
