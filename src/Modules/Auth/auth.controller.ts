import {Request, Response, NextFunction, Router } from "express"
import authService from "./auth.service";
import { BadRequestException } from "../../Common/Utils";
import { responseFormatter } from "../../Middlewares";
const authController = Router()

authController.get("/health", responseFormatter(async (req:Request, res:Response, next:NextFunction) => {
    const result = await authService.health(req.body)
    return { message: "User registered successfully", data: result, meta: {statusCode:201}}
}))


export default authController