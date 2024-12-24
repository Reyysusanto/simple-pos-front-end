import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password should have min 5 character" }),
});

export const SignUpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email already taken" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password should have min 5 character" }),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
});
