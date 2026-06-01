"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatter = exports.globalErrorHandler = void 0;
var global_error_handler_middleware_1 = require("./global-error-handler.middleware");
Object.defineProperty(exports, "globalErrorHandler", { enumerable: true, get: function () { return __importDefault(global_error_handler_middleware_1).default; } });
var response_formatter_middlware_1 = require("./response-formatter.middlware");
Object.defineProperty(exports, "responseFormatter", { enumerable: true, get: function () { return __importDefault(response_formatter_middlware_1).default; } });
//# sourceMappingURL=index.js.map