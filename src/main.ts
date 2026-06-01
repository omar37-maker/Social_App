import express, { Application } from "express"
import { envConfig } from "./config";
import { authController, commentController, postController, userController } from "./Modules";
import { dbConnection } from "./DB/db.connection";
import { globalErrorHandler } from "./Middlewares";


const app: Application = express()



function initializeControllers(app: Application) { 
    app.use("/api/auth", authController);
    app.use("/api/user", userController); 
    app.use("/api/post", postController); 
    app.use("/api/comment", commentController);

    app.get("/", (_req: express.Request, res: express.Response) => {
      res.json({ message: "Welcome to the Express + TypeScript Server!" });
    });

    app.use((_req: express.Request, res: express.Response) => {
      res.status(404).json({ message: "Route not found" });
    });

    app.use(globalErrorHandler)
}




function initializeCommentMiddlewares(app: Application) { 
    app.use(express.json())
}


initializeCommentMiddlewares(app)
initializeControllers(app)

dbConnection()

const port: number | string = envConfig.app.port
app.listen(port, () => { 
    console.log("server is running on port", port);
    
})