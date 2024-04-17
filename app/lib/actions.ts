"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cambiarFormatoFecha } from "./utils";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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
  let fechaFormateada;

  if (fechaNacimiento) {
    fechaFormateada = cambiarFormatoFecha(fechaNacimiento);
  }

  // Insert data into the database
  try {
    await sql`
      INSERT INTO pacientes (dni, nombres, apellidos, fecha_nacimiento)
      VALUES (${dni}, ${nombres}, ${apellidos}, ${fechaFormateada})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Paciente.",
    };
  }

  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";

  if (fullUrl.includes("/sistema/diagnostico")) {
    revalidatePath("/sistema/diagnostico");
    redirect("/sistema/diagnostico");
  }

  if (fullUrl.includes("/sistema/pacientes")) {
    revalidatePath("/sistema/pacientes");
    redirect("/sistema/pacientes");
  }
}

export async function updatePaciente(id: string, formData: FormData) {
  // Prepare data for insertion into the database
  const dni = formData.get("dni")?.toString();
  const nombres = formData.get("nombres")?.toString();
  const apellidos = formData.get("apellidos")?.toString();
  const fechaNacimiento = formData.get("fechaNacimiento")?.toString();
  let fechaFormateada;

  if (fechaNacimiento) {
    fechaFormateada = cambiarFormatoFecha(fechaNacimiento);
  }

  // Insert data into the database
  try {
    await sql`
      UPDATE pacientes 
      SET dni = ${dni}, nombres = ${nombres}, apellidos = ${apellidos}, fecha_nacimiento = ${fechaFormateada}
      WHERE id = ${id}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Update Paciente.",
    };
  }

  revalidatePath("/sistema/pacientes");
  redirect("/sistema/pacientes");
}

export async function deletePaciente(id: string) {
  try {
    await sql`DELETE FROM pacientes WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Paciente." };
  }

  revalidatePath("/sistema/pacientes");
  redirect("/sistema/pacientes");
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

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
