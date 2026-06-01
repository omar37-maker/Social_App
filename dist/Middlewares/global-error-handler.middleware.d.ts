import { IHttpAppError } from "../Common/Types";
import { Request, Response, NextFunction } from 'express';
/**
 * Global error handler middleware
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
declare const globalErrorHandler: (err: IHttpAppError, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
//# sourceMappingURL=global-error-handler.middleware.d.ts.map