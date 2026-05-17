"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const Modules_1 = require("./Modules");
const db_connection_1 = require("./DB/db.connection");
const app = (0, express_1.default)();
function initializeControllers(app) {
    app.use("/api/auth", Modules_1.authController);
    app.use("/api/user", Modules_1.userController);
    app.use("/api/post", Modules_1.postController);
    app.use("/api/comment", Modules_1.commentController);
    app.get("/", (_req, res) => {
        res.json({ message: "Welcome to the Express + TypeScript Server!" });
    });
    app.use((_req, res) => {
        res.status(404).json({ message: "Route not found" });
    });
}
function initializeCommentMiddlewares(app) {
    app.use(express_1.default.json());
}
initializeCommentMiddlewares(app);
initializeControllers(app);
(0, db_connection_1.dbConnection)();
// app.get("/health", (req: Request, res: Response, next: NextFunction) => { 
//     res.json({
//         status: "ok",
//         message: "Health check"
//     })
// })
const port = config_1.envConfig.app.port;
app.listen(port, () => {
    console.log("server is running on port", port);
});
//# sourceMappingURL=main.js.map