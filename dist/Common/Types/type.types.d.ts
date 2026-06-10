import z from "zod";
import { SignUpSchema, SignInSchema } from "../../validators/auth.validators";
export type SignUpBodyType = z.infer<typeof SignUpSchema.body>;
export type SignInBodyType = z.infer<typeof SignInSchema.body>;
//# sourceMappingURL=type.types.d.ts.map