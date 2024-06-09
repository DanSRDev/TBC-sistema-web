import { sql } from "@vercel/postgres";
import {
  Doctor,
  Paciente,
  Diagnostico,
  DiagnosticoDashboard,
  DiagnosticoHistorial,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;

/* FETCH DATA */

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

/* DASHBOARD */

export async function fetchCases(resultado: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM diagnosticos
    WHERE resultado = ${resultado}
  `;
    return count.rows[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos data.");
  }
}

export async function fetchDiagnosticosPerYear(resultado: string) {
  noStore();

  try {
    const count = await sql`
    SELECT 
      EXTRACT(YEAR FROM fecha) AS año,
      COUNT(*) AS cantidad
    FROM 
      diagnosticos
    WHERE 
      resultado = ${resultado}
    GROUP BY 
      EXTRACT(YEAR FROM fecha)
    ORDER BY 
      año DESC;
  `;
    return count.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos per year data.");
  }
}

export async function fetchDiagnosticosLastYear(resultado: string) {
  noStore();

  try {
    const count = await sql`
    SELECT 
      EXTRACT(YEAR FROM fecha) AS año,
      EXTRACT(MONTH FROM fecha) AS mes,
      COUNT(*) AS cantidad
    FROM 
      diagnosticos
    WHERE 
      fecha >= CURRENT_DATE - INTERVAL '1 year' AND
      resultado = ${resultado}
    GROUP BY 
      EXTRACT(YEAR FROM fecha),
      EXTRACT(MONTH FROM fecha)
    ORDER BY 
      año DESC, 
      mes DESC;
  `;
    return count.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos last year data.");
  }
}

/* DIAGNOSTICO */

export async function fetchPacientesList() {
  noStore();

  try {
    const data = await sql<Paciente>`
        SELECT pacientes.id, pacientes.dni, pacientes.nombres, pacientes.apellidos
        FROM pacientes
        ORDER BY pacientes.apellidos ASC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch pacientes data list.");
  }
}

/* PACIENTES */

export async function fetchFilteredPacientes(
  query: string,
  currentPage: number
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Paciente>`
		SELECT * FROM pacientes
		WHERE
		  pacientes.nombres ILIKE ${`%${query}%`} OR
      pacientes.apellidos ILIKE ${`%${query}%`}
		ORDER BY pacientes.apellidos ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;
    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch filteres pacientes data.");
  }
}

export async function fetchPacientesPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM pacientes
    WHERE
      pacientes.nombres ILIKE ${`%${query}%`} OR
      pacientes.apellidos ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pacientes.");
  }
}

/* HISTORIAL */

export async function fetchHistorialDiagnosticos() {
  noStore();

  try {
    const data = await sql<DiagnosticoHistorial>`
      SELECT diag.id, d.nombres as doc_nombres, d.apellidos as doc_apellidos, p.nombres as pac_nombres, p.apellidos as pac_apellidos, diag.fecha, diag.imagen_url, diag.resultado 
      FROM diagnosticos diag
      LEFT JOIN doctores d ON diag.doctor_id = d.id
      LEFT JOIN pacientes p ON diag.paciente_id = p.id
      ORDER BY diag.fecha
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos data.");
  }
}

export async function fetchFilteredDiagnosticos(
  query: string,
  currentPage: number
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<DiagnosticoHistorial>`
      SELECT diag.id, d.nombres as doc_nombres, d.apellidos as doc_apellidos, p.nombres as pac_nombres, p.apellidos as pac_apellidos, diag.fecha, diag.imagen_url as imagen, diag.resultado 
      FROM diagnosticos diag
      LEFT JOIN doctores d ON diag.doctor_id = d.id
      LEFT JOIN pacientes p ON diag.paciente_id = p.id
      WHERE
        p.nombres ILIKE ${`%${query}%`} OR
        p.apellidos ILIKE ${`%${query}%`} OR
        d.nombres ILIKE ${`%${query}%`} OR
        d.apellidos ILIKE ${`%${query}%`} OR
        diag.fecha::text ILIKE ${`%${query}%`} OR
        diag.resultado ILIKE ${`%${query}%`}
      ORDER BY diag.fecha DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos data.");
  }
}

export async function fetchDiagnosticosPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM diagnosticos diag
    JOIN pacientes p ON diag.paciente_id = p.id
    JOIN doctores d ON diag.doctor_id = d.id
    WHERE
      p.nombres ILIKE ${`%${query}%`} OR
      p.apellidos ILIKE ${`%${query}%`} OR
      d.nombres ILIKE ${`%${query}%`} OR
      d.apellidos ILIKE ${`%${query}%`} OR
      diag.fecha::text ILIKE ${`%${query}%`} OR
      diag.resultado ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of diagnosticos.");
  }
}

/* EXTRAS */

export async function getDoctor(email: string) {
  try {
    const user = await sql`SELECT * FROM doctores WHERE email=${email}`;
    return user.rows[0] as Doctor;
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    throw new Error("Failed to fetch doctor.");
  }
}

export async function fetchDiagnosticosDashboard() {
  noStore();

  try {
    const data =
      await sql<DiagnosticoDashboard>`SELECT diagnosticos.fecha, diagnosticos.resultado FROM diagnosticos`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch diagnosticos dashboard data.");
  }
}
