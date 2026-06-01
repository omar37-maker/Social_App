import { IHttpAppError } from "../Common/Types";
import { envConfig } from "../config/index.js";
import { Request, Response, NextFunction } from 'express';
//  JSDOCS
/**
 * Global error handler middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const globalErrorHandler = (err:IHttpAppError, req:Request, res:Response, next:NextFunction) => {
  console.log(err);

  res.status(err?.statusCode || 500).json({
    message: err.message || "Internal server error",
    stack: envConfig.app.nodeEnv == "dev" ? err.stack : undefined,
    error: {
      code: err.code,
      details: err.details,
    },
  });
};

export default globalErrorHandler;
