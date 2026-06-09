

import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { BadRequestException } from '../Common/Utils';

type RequestKey = keyof Request;
type SchemaType = Partial<Record<RequestKey, ZodType>>;

const validation = (schema: SchemaType) => { 
    return async (req: Request, res: Response, next: NextFunction) => { 

        const validationErrors = []
        for (const key in schema) { 
            const validkey = key as RequestKey;
            const result = schema[validkey]?.safeParse(req[validkey]);
            console.log(key, result);
            if (!result?.success) {
                validationErrors.push(result?.error.issues) 

            }
        }
        if(validationErrors.length)throw new BadRequestException("validation error", validationErrors)
        next()
    }
}

export default validation;

