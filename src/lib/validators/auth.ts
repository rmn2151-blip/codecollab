import { z } from "zod";

export const signUpSchema = z
  .object({
    displayName: z
      .string()
      .min(2, "Display name must be at least 2 characters"),
    email: z
      .string()
      .email("Please enter a valid email")
      .refine((email) => email.endsWith(".edu"), {
        message: "You must use a .edu email address",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
