import z from "zod";
import { AuthSchema } from "../../validators/auth.validators";
export type AuthBodyType = z.infer<typeof AuthSchema.body>;
//# sourceMappingURL=type.types.d.ts.map