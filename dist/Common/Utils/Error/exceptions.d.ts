import { HttpAppError } from "./app-error.js";
export declare class ConflictException extends HttpAppError {
    constructor(message?: string, details?: unknown);
}
export declare class NotFoundException extends HttpAppError {
    constructor(message?: string, details?: null);
}
export declare class BadRequestException extends HttpAppError {
    constructor(message?: string, details?: unknown | null);
}
export declare class InternalServerErrorException extends HttpAppError {
    constructor(message?: string, details?: unknown);
}
export declare class TooManyRequestsException extends HttpAppError {
    constructor(message?: string, details?: unknown);
}
//# sourceMappingURL=exceptions.d.ts.map