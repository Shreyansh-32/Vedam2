import {z} from "zod"

export const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' })
    .max(20, { message: 'Maximum length 20' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Must contain one uppercase alphabet',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Must contain one lowercase alphabet',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Must contain one specail character',
    }),
    firstname: z.string(),
    lastname: z.string(),
    phone: z.number().gte(1000000000).lte(9999999999),
    role : z.enum(["user" , "seller"])
});

export const sellerSchema = z.object({
    email: z.string().email(),
    password: z.string()
    .min(8, { message: 'minLengthErrorMessage' })
    .max(20, { message: 'maxLengthErrorMessage' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'uppercaseErrorMessage',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'lowercaseErrorMessage',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'numberErrorMessage' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'specialCharacterErrorMessage',
    }),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.number().gte(1000000000).lte(9999999999),
});

export const signinSchema = z.object({
  email: z.string().email(),
    password: z.string()
    .min(8, { message: 'Minimum length 8' })
    .max(20, { message: 'Maximum length 20' })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Must contain one uppercase alphabet',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Must contain one lowercase alphabet',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain one digit' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: 'Must contain one specail character',
    }),
    role : z.enum(["user" , "seller"])
})