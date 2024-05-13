"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cambiarFormatoFecha } from "./utils";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
const bcrypt = require("bcrypt");

const DoctorFormSchema = z.object({
  id: z.string(),
  dni: z
    .string({
      invalid_type_error: "Ingrese un DNI válido.",
    })
    .length(8, { message: "Ingrese un DNI válido." }),
  nombres: z
    .string({
      invalid_type_error: "Ingrese sus nombres.",
    })
    .min(1, { message: "Ingrese sus nombres." }),
  apellidos: z
    .string({
      invalid_type_error: "Ingrese sus apellidos.",
    })
    .min(1, { message: "Ingrese sus apellidos." }),
  email: z
    .string({
      invalid_type_error: "Ingrese su correo electronico.",
    })
    .email({ message: "Ingrese un correo electronico válido." }),
  password: z
    .string({
      invalid_type_error: "Ingrese una contraseña.",
    })
    .min(1, { message: "Ingrese una contraseña." }),
});

const PacienteFormSchema = z.object({
  id: z.string(),
  dni: z
    .string({
      invalid_type_error: "Ingrese un DNI válido.",
    })
    .length(8, { message: "Ingrese un DNI válido." }),
  nombres: z
    .string({
      invalid_type_error: "Ingrese los nombres del paciente.",
    })
    .min(1, { message: "Ingrese los nombres del paciente" }),
  apellidos: z
    .string({
      invalid_type_error: "Ingrese los apellidos del paciente.",
    })
    .min(1, { message: "Ingrese los apellidos del paciente." }),
  fechaNacimiento: z
    .string({
      invalid_type_error: "Ingrese la fecha de nacimiento del paciente.",
    })
    .min(1, { message: "Ingrese la fecha de nacimiento del paciente." }),
});

const CreateDoctor = DoctorFormSchema.omit({ id: true });
const CreatePaciente = PacienteFormSchema.omit({ id: true });
const UpdatePaciente = PacienteFormSchema.omit({ id: true });

export type DoctorState = {
  errors?: {
    dni?: string[];
    nombres?: string[];
    apellidos?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type PacienteState = {
  errors?: {
    dni?: string[];
    nombres?: string[];
    apellidos?: string[];
    fechaNacimiento?: string[];
  };
  message?: string | null;
};

export async function createDoctor(prevState: DoctorState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateDoctor.safeParse({
    dni: formData.get("dni"),
    nombres: formData.get("nombres"),
    apellidos: formData.get("apellidos"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Doctor.",
    };
  }

  // Prepare data for insertion into the database
  const { dni, nombres, apellidos, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert data into the database
  try {
    await sql`
      INSERT INTO doctores (dni, nombres, apellidos, email, password)
      VALUES (${dni}, ${nombres}, ${apellidos}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Doctor.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}

export async function createPaciente(
  prevState: PacienteState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreatePaciente.safeParse({
    dni: formData.get("dni"),
    nombres: formData.get("nombres"),
    apellidos: formData.get("apellidos"),
    fechaNacimiento: formData.get("fechaNacimiento"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Paciente.",
    };
  }

  // Prepare data for insertion into the database
  const { dni, nombres, apellidos, fechaNacimiento } = validatedFields.data;
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
  } else {
    revalidatePath("/sistema/pacientes");
    redirect("/sistema/pacientes");
  }
}

export async function updatePaciente(
  id: string,
  prevState: PacienteState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = UpdatePaciente.safeParse({
    dni: formData.get("dni"),
    nombres: formData.get("nombres"),
    apellidos: formData.get("apellidos"),
    fechaNacimiento: formData.get("fechaNacimiento"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Paciente.",
    };
  }

  // Prepare data for insertion into the database
  const { dni, nombres, apellidos, fechaNacimiento } = validatedFields.data;
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

export async function createDiagnostico(doctorId: string, pacienteId: string, resultado: string) {
  // Prepare data for insertion into the database
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Correo electrónico o contraseña incorrectos.";
        default:
          return "Algo salio mal.";
      }
    }
    throw error;
  }
}
