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
  // Prepare data for insertion into the database
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

  revalidatePath("/sistema/diagnostico");
  redirect("/sistema/diagnostico");
}

export async function createDiagnostico(pacienteId: string, resultado: string) {
  // Prepare data for insertion into the database
  const doctorId = "410544b2-4001-4271-9855-fec4b6a6400a";
  const fecha = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO diagnosticos (doctor_id, paciente_id, fecha, resultado)
      VALUES (${doctorId}, ${pacienteId}, ${fecha}, ${resultado})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/sistema/diagnostico");
  redirect("/sistema/diagnostico");
}
