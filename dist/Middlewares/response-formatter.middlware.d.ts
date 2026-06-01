import { Response, Request, NextFunction } from "express";
export declare const responseFormatter: (handler: Function) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default responseFormatter;
//# sourceMappingURL=response-formatter.middlware.d.ts.map