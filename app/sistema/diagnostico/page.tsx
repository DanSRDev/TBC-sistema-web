import React from "react";
import { fetchPacientesList } from "@/app/lib/data";
import PacienteDiagnostico from "@/app/(components)/ui/diagnostico/PacienteDiagnostico";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Diagnostico({ searchParams }: SearchParamProps) {
  const pacientes = await fetchPacientesList();
  const agregar = searchParams?.agregar;
  const escoger = searchParams?.escoger;

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Módulo de Diagnóstico</h1>
      <PacienteDiagnostico pacientes={pacientes} agregar={agregar} escoger ={escoger}/>
    </div>
  );
}
