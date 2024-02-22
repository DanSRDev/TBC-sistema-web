import { fetchDiagnosticos, fetchDiagnosticosDashboard, fetchDiagnoticosPaciente, fetchDoctores, fetchFilteredPacientes, fetchPacientes, getDoctor } from '@/app/lib/data'
import React from 'react'

type Props = {}

export default async function Historial({}: Props) {

  const doctores = await fetchDoctores();
  const pacientes = await fetchPacientes();
  const diagnosticos = await fetchDiagnosticos();
  const diagnosticosDashboard = await fetchDiagnosticosDashboard();
  const diagnosticosPaciente = await fetchDiagnoticosPaciente(pacientes[0].id);
  const filteredPacientes = await fetchFilteredPacientes("Paciente3");
  const doctor = await getDoctor("user@email.com");


  console.log("Doctores", doctores)
  console.log("Pacientes", pacientes)
  console.log("diagnosticos", diagnosticos)
  console.log("diagnosticosDashboard", diagnosticosDashboard)
  console.log("diagnosticosPaciente", diagnosticosPaciente)
  console.log("filteredPaciente", filteredPacientes)
  console.log("Doctor", doctor)



  return (
    <div>Historial</div>
  )
}