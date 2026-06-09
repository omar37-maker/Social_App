import z from "zod";
import { GENDER } from "../Common/Types";
export declare const AuthSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
        confirm: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        gender: z.ZodEnum<typeof GENDER>;
        userId: z.ZodString;
        age: z.ZodNumber;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validators.d.ts.map