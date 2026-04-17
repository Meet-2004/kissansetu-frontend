import { z } from "zod";

export const signupSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Pasword Required"),
    newPassword: z
      .string()
      .min(6, "Minimum 6 Character Required")
      .regex(/[^A-Za-z0-9]/,"One Special Character Required")
      .regex(/[0-9]/, "One Digit is Required"),
    confirmNewPassword: z.string("Confirm password  Required").min(1,"Confirm password  Required"),
  })
  .refine((data) => data.password !== data.confirmNewPassword, {
    message: "Password does not match",
    path: ["confirmNewPassword"],
  });
