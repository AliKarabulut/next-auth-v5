import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(8, {
    message: 'Minimum 8 characters required',
  }),
  rememberMe: z.optional(z.boolean()),
  code: z.optional(z.string()),
})

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Minimum 8 characters required',
      })
      .refine(value => /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one digit',
      }),
    confirmPassword: z.string(),
    name: z.string().min(2, {
      message: 'Name is required',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const EmailSchema = z.object({
  email: z.string().email(),
})

export const EmailVerifyScheme = z
  .object({
    email: z.string().email({
      message: 'Email is required',
    }),
    confirmEmail: z.string().email(),
  })
  .refine(data => data.email === data.confirmEmail, {
    message: 'Emails do not match',
    path: ['confirmEmail'],
  })

export const ChangePasswordScheme = z
  .object({
    oldPassword: z.string().min(8, {
      message: 'Minimum 8 characters required',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Minimum 8 characters required',
      })
      .refine(value => /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one digit',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const NewPasswordScheme = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Minimum 8 characters required',
      })
      .refine(value => /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one digit',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const TodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required',
    })
    .max(200, {
      message: 'Title cannot exceed 200 characters',
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description is required',
    })
    .max(500, {
      message: 'Description cannot exceed 500 characters',
    }),
  priority: z.enum(['low', 'medium', 'high']),
})

export const BooleanSchema = z.object({
  value: z.boolean(),
})
