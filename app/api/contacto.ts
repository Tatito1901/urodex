// pages/api/contacto.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(100, { message: "Máximo 100 caracteres" })
    .trim(),
  correo: z
    .string()
    .email({ message: "Correo inválido" })
    .max(100, { message: "Máximo 100 caracteres" })
    .trim(),
  celular: z
    .string()
    .regex(/^\+?\d{7,15}$/, { message: "Formato de teléfono inválido" }),
  diagnostico: z.enum(["si", "no", "revision"], {
    errorMap: () => ({ message: "Selecciona una opción válida" }),
  }),
  comentarios: z
    .string()
    .max(1000, { message: "Máximo 1000 caracteres" })
    .optional()
    .default(""),
});

type ResponseData = { success: boolean; message?: string; errors?: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Método no permitido" });
  }

  const parse = contactFormSchema.safeParse(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .json({ success: false, errors: parse.error.format() });
  }
  let data = parse.data;

  // Sanitizar texto para prevenir XSS
  data = {
    ...data,
    nombre: DOMPurify.sanitize(data.nombre),
    comentarios: DOMPurify.sanitize(data.comentarios),
  };

  // Simula un envío (aquí pondrías tu ORM o Mailchimp)
  await new Promise((r) => setTimeout(r, 1000));
  console.log("📨 Mock envío correcto:", data);

  return res
    .status(200)
    .json({ success: true, message: "¡Envío exitoso! (mock)" });
}
