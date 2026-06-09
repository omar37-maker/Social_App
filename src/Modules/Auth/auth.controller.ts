import {Request, Response, NextFunction, Router } from "express"
import authService from "./auth.service";
import { BadRequestException } from "../../Common/Utils";
import { responseFormatter, validation } from "../../Middlewares";
import { AuthSchema } from "../../validators/auth.validators";
const authController = Router()

authController.get("/health",validation(AuthSchema), responseFormatter(async (req:Request, res:Response, next:NextFunction) => {
    const result = await authService.health(req.body)
    return { message: "User registered successfully", data: result, meta: {statusCode:201}}
}))


export default authController