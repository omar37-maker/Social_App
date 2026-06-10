import {Request, Response, NextFunction, Router } from "express"
import authService from "./auth.service";
import { responseFormatter, validation } from "../../Middlewares";
import { SignInSchema, SignUpSchema } from "../../validators/auth.validators";
const authController = Router()

authController.get("/health", responseFormatter(async (req:Request, res:Response, next:NextFunction) => {
    const result = authService.health()
    return { message: "Health check successful", data: result, meta: {statusCode:201}}
}))

authController.post("/signup",validation(SignUpSchema), responseFormatter(
    async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.SignUp(req.body)
    return { message: "User created successfully", data: result, meta: {statusCode:201}}
    }))

authController.post("/signin",validation(SignInSchema), responseFormatter(
    async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.SignIn(req.body)
    return { message: "User signed in successfully", data: result, meta: {statusCode:201}}
    }))

    authController.get("/users", responseFormatter(
    async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.listUsers()
    return { message: "User fetched  successfully", data: result, meta: {statusCode:201}}
    }))




export default authController