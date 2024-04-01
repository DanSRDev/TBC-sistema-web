"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export type State = {
  errors?: {
    dni?: string;
    nombres?: string;
    apellidos?: string;
    fechaNacimineto?: string;
  };
  message?: string | null;
};

export async function createPaciente(formData: FormData) {

  const dni = formData.get("dni")?.toString();
  const nombres = formData.get("nombres")?.toString();
  const apellidos = formData.get("apellidos")?.toString();
  const fechaNacimiento = formData.get("fechaNacimiento")?.toString();

  // Insert data into the database
  try {
    await sql`
      INSERT INTO pacientes (dni, nombres, apellidos, fecha_nacimiento)
      VALUES (${dni}, ${nombres}, ${apellidos}, ${fechaNacimiento})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Paciente.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/sistema/diagnostico");
  redirect("/sistema/diagnostico");
}
