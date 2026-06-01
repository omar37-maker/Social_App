"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../config/index.js");
//  JSDOCS
/**
 * Global error handler middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({
        message: err.message || "Internal server error",
        stack: index_js_1.envConfig.app.nodeEnv == "dev" ? err.stack : undefined,
        error: {
            code: err.code,
            details: err.details,
        },
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=global-error-handler.middleware.js.map