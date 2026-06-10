import z, { email } from "zod";
import { GENDER } from "../Common/Types";

export const SignUpSchema = {
    body: z.object({
        firstName: z.string().min(3, {error: "first name must be at least 3 characters long"}),
        lastName: z.string().min(3, {error: "last name must be at least 3 characters long"}),
        email: z.email({error: "email must be a valid email"}),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,),
        confirm:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,),
        phoneNumber: z.string().optional(),
        gender: z.enum(GENDER),
        age: z.number().gt(18, { error: "age must be greater than 18" }),
        workExperience: z.array(z.object({
            company: z.string(),
            position: z.string(),
            startDate: z.iso.date(),
            endDate: z.iso.date(),
            currentlyWorking: z.boolean(),
        })).optional()
  }).superRefine((val, cxt) => { 
      if (val.password !== val.confirm) { 
          cxt.addIssue({
              message: "Please confirm must be equal to password",
              path: ["confirm"],
              code: "custom"
            
          })
      }

      if (val.workExperience?.length) {
          val.workExperience.forEach((workExperience, index) => { 
              if (!workExperience.currentlyWorking && !workExperience.endDate) { 
                  cxt.addIssue({
                      message: "end date is required for work experience",
                      path: ["workExperience", index, "endDate"],
                      code: "custom"
                    
                  })
              }

              if (workExperience.endDate && workExperience.endDate < workExperience.startDate) {
                  cxt.addIssue({
                      message: "end date must be after start date",
                      path: ["workExperience", index, "endDate"],
                      code: "custom"
                  })
              }
          }) 

      }
  })
};

export const SignInSchema = {
    body: z.object({
        email: z.email({ error: "email must be a valid email" }),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,)
    })
}

