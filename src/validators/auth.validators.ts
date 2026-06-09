import z from "zod";
import { GENDER } from "../Common/Types";
import { isValidObjectId } from "mongoose";

export const AuthSchema = {
  body: z.object({
      email: z.email({error: "email must be a valid email"}),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,),
    confirm:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,),
    phone: z.string().optional(),
    gender: z.enum(GENDER),
      userId: z.string(),
      age: z.number().gt(18,{error: "age must be greater than 18"})
  }).superRefine((val, cxt) => { 
      if (val.password !== val.confirm) { 
          cxt.addIssue({
              message: "Please confirm must be equal to password",
              path: ["confirm"],
              code: "custom"
            
          })
      }

      if (!isValidObjectId(val.userId)) { 
          cxt.addIssue({
              message: "invalid Id",
              path: ["userId"],
              code: "custom"
            
          })
      }
  })
    //   .refine((data) => data.password === data.confirm,
    //   {
    //       error: "Please confirm must be equal to password",
    //       path: ["confirm"]
    //   }).refine((data) => isValidObjectId(data.userId), {error: "invalid ObjectId"})
};

