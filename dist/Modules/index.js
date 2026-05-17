"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = exports.userController = exports.postController = exports.authController = void 0;
var auth_controller_1 = require("./Auth/auth.controller");
Object.defineProperty(exports, "authController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
var post_controller_1 = require("./Post/post.controller");
Object.defineProperty(exports, "postController", { enumerable: true, get: function () { return __importDefault(post_controller_1).default; } });
var user_controller_1 = require("./User/user.controller");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(user_controller_1).default; } });
var comment_controller_1 = require("./Comment/comment.controller");
Object.defineProperty(exports, "commentController", { enumerable: true, get: function () { return __importDefault(comment_controller_1).default; } });
//# sourceMappingURL=index.js.map