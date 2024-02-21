const { db } = require("@vercel/postgres");
const {
  doctores,
  pacientes,
  diagnosticos,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedDoctores(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Crear tabla doctores si no existe
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS doctores (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        dni VARCHAR(8) NOT NULL,
        nombres VARCHAR(255) NOT NULL,
        apellidos VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Tabla doctores creada`);

    // Agregar datos en la tabla doctores
    const insertedDoctores = await Promise.all(
      doctores.map(async (doctor) => {
        const hashedPassword = await bcrypt.hash(doctor.password, 10);
        return client.sql`
        INSERT INTO doctores (id, dni, nombres, apellidos, email, password)
        VALUES (${doctor.id}, ${doctor.dni}, ${doctor.nombres}, ${doctor.apellidos}, ${doctor.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Agregados ${insertedDoctores.length} doctores`);

    return {
      createTable,
      doctores: insertedDoctores,
    };
  } catch (error) {
    console.error("Error agregando doctores:", error);
    throw error;
  }
}

async function seedPacientes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Crear la tabla pacientes si no existe
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS pacientes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      dni VARCHAR(8) NOT NULL,
      nombres VARCHAR(255) NOT NULL,
      apellidos VARCHAR(255) NOT NULL,
      fecha_nacimiento DATE NOT NULL
  );
`;

    console.log(`Tabla pacientes creada`);

    // Agregar datos en la tabla pacientes
    const insertedPacientes = await Promise.all(
      pacientes.map(
        (paciente) => client.sql`
        INSERT INTO pacientes (id, dni, nombres, apellidos, fecha_nacimiento)
        VALUES (${paciente.id}, ${paciente.dni}, ${paciente.nombres}, ${paciente.apellidos}, ${paciente.fecha_nacimiento})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Agregados ${insertedPacientes.length} pacientes`);

    return {
      createTable,
      pacientes: insertedPacientes,
    };
  } catch (error) {
    console.error("Error agredando pacientes:", error);
    throw error;
  }
}

async function seedDiagnosticos(client) {
  try {
    // Crear la tabla diagnosticos si no existe
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS diagnosticos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        doctor_id UUID NOT NULL REFERENCES doctores(id),
        paciente_id UUID NOT NULL REFERENCES pacientes(id),
        fecha DATE NOT NULL,
        resultado VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Tabla diagnosticos creada`);

    // Agregar datos en la tabla diagnosticos
    const insertedDiagnosticos = await Promise.all(
      diagnosticos.map(
        (diagnostico) => client.sql`
        INSERT INTO diagnosticos (id, doctor_id, paciente_id, fecha, resultado)
        VALUES (${diagnostico.id}, ${diagnostico.doctor_id}, ${diagnostico.paciente_id}, ${diagnostico.fecha}, ${diagnostico.resultado})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Agregados ${insertedDiagnosticos.length} diagnosticos`);

    return {
      createTable,
      diagnosticos: insertedDiagnosticos,
    };
  } catch (error) {
    console.error("Error agregando diagnosticos:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedDoctores(client);
  await seedPacientes(client);
  await seedDiagnosticos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "Se presento un error al llenar la database:",
    err
  );
});
