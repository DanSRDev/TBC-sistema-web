import { sql } from "@vercel/postgres";
import {
  Doctor,
  Paciente,
  Diagnostico,
  DiagnosticoDashboard,
  DiagnosticosPaciente,
  FilteredPacientes,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchDoctores() {
  noStore();

  try {
    const data = await sql<Doctor>`SELECT * FROM doctores`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch doctores data.");
  }
}

export async function fetchPacientes() {
  noStore();

  try {
    const data = await sql<Paciente>`SELECT * FROM pacientes`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch pacientes data.");
  }
}

export async function fetchDiagnosticos() {
  noStore();

  try {
    const data = await sql<Diagnostico>`SELECT * FROM diagnosticos`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos data.");
  }
}


export async function fetchDiagnosticosDashboard() {
  noStore();

  try {
    const data = await sql<DiagnosticoDashboard>`SELECT diagnosticos.fecha, diagnosticos.resultado FROM diagnosticos`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos dashboard data.");
  }
}

export async function fetchDiagnoticosPaciente(id: string) {
  noStore();

  try {
    const data = await sql<DiagnosticosPaciente>`
      SELECT doctores.nombres, doctores.apellidos, diagnosticos.fecha, diagnosticos.resultado 
      FROM diagnosticos
      JOIN doctores ON diagnosticos.doctor_id = doctores.id
      WHERE diagnosticos.paciente_id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos paciente data.");
  }
}


export async function fetchFilteredPacientes(query: string) {
  noStore();

  try {
    const data = await sql<FilteredPacientes>`
		SELECT pacientes.id, pacientes.nombres, pacientes.apellidos
		FROM pacientes
		WHERE
		  pacientes.nombres ILIKE ${`%${query}%`} OR
      pacientes.apellidos ILIKE ${`%${query}%`}
		GROUP BY pacientes.id, pacientes.nombres, pacientes.apellidos
		ORDER BY pacientes.nombres ASC
	  `;
    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch filteres pacientes data.");
  }
}

export async function getDoctor(email: string) {
  try {
    const user = await sql`SELECT * FROM doctores WHERE email=${email}`;
    return user.rows[0] as Doctor;
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    throw new Error("Failed to fetch doctor.");
  }
}
