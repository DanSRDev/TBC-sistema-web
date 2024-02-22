export type Doctor = {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
};

export type Paciente = {
  id: string;
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
};

export type Diagnostico = {
  id: string;
  doctor_id: string;
  paciente_id: string;
  fecha: string;
  resultado: "Normal" | "Tuberculosis";
};

export type DiagnosticoDashboard = {
  fecha: string;
  resultado: "Normal" | "Tuberculosis";
};

export type DiagnosticosPaciente = {
  doctor_nombres: string;
  doctor_apellidos: string;
  fecha: string;
  resultado: "Normal" | "Tuberculosis";
};

export type FilteredPacientes = {
  id: string;
  nombres: string;
  apellidos: string;
};