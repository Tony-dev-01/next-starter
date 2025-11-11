import { email, z } from "zod";

const nameSchema = z
  .string()
  .min(2, "Enter your name")
  .refine((val) => !/[<>"'&;`|${}()[\]\\]/.test(val), "Enter valid characters")
  .refine((val) => !/\d/.test(val), "Enter valid characters");

const emailSchema = z.string().email("Enter a valid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .refine(
    (val) => !/[<>"'&;`|{}()[\]\\]/.test(val),
    "Password must contain valid characters"
  );

export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required")
    .refine(
      (val) => !/[<>"'&;`|${}()[\]\\]/.test(val),
      "Invalid characters in password"
    ),
});

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords have to match",
        path: ["confirmPassword"],
      });
    }
  });
