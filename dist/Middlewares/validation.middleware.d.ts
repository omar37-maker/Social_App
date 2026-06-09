import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
type RequestKey = keyof Request;
type SchemaType = Partial<Record<RequestKey, ZodType>>;
declare const validation: (schema: SchemaType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default validation;
//# sourceMappingURL=validation.middleware.d.ts.map