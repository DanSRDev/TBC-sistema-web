const doctores = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6400a",
    dni: "12345678",
    nombres: "Nombre Nombre2",
    apellidos: "Apellido Apellido2",
    email: "user@email.com",
    password: "123456",
  },
];

const pacientes = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6401a",
    dni: "00000001",
    nombres: "PacienteN PacienteN2",
    apellidos: "PacienteA PacienteA2",
    fecha_nacimiento: "1990-01-01",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6402a",
    dni: "00000002",
    nombres: "Paciente2N Paciente2N2",
    apellidos: "Paciente2A Paciente2A2",
    fecha_nacimiento: "1990-01-02",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6403a",
    dni: "00000003",
    nombres: "Paciente3N Paciente3N2",
    apellidos: "Paciente3A Paciente3A2",
    fecha_nacimiento: "1990-01-03",
  },
];

const diagnosticos = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6411a",
    doctor_id: doctores[0].id,
    paciente_id: pacientes[0].id,
    fecha: "2022-12-06",
    resultado: "Tuberculosis",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6412a",
    doctor_id: doctores[0].id,
    paciente_id: pacientes[1].id,
    fecha: "2022-12-06",
    resultado: "Normal",
  },
];

module.exports = {
  doctores,
  pacientes,
  diagnosticos,
};
