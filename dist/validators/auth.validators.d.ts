import z from "zod";
import { GENDER } from "../Common/Types";
export declare const SignUpSchema: {
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        confirm: z.ZodString;
        phoneNumber: z.ZodOptional<z.ZodString>;
        gender: z.ZodEnum<typeof GENDER>;
        age: z.ZodNumber;
        workExperience: z.ZodOptional<z.ZodArray<z.ZodObject<{
            company: z.ZodString;
            position: z.ZodString;
            startDate: z.ZodISODate;
            endDate: z.ZodISODate;
            currentlyWorking: z.ZodBoolean;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
};
export declare const SignInSchema: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validators.d.ts.map