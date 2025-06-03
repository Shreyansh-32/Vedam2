import {z} from "zod"

export const userSchema = z.object({
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