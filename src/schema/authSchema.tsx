import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, {
      message: "Enter a valid email (example: abc@gmail.com)",
    }),

  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "At least 8 characters required")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/\d/, "Must include a number")
    .regex(/[@$!%*?&]/, "Must include a special character"),
});
export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .nonempty("Email is required")
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, {
      message: "Enter a valid email",
    }),

  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "At least 8 characters required")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/\d/, "Must include a number")
    .regex(/[@$!%*?&]/, "Must include a special character"),

  country: z.string().nonempty("Please select a country"),

  mobile: z
    .string()
    .nonempty("Mobile number is required")
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit number"),
});