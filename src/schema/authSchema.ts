import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Email inválido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." })
    .regex(/[0-9]/, { message: "Debe contener al menos un número." })
    .trim(),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;