import React from "react";
import { fetchPacientesList } from "@/app/lib/data";
import PacienteDiagnostico from "@/app/(components)/ui/diagnostico/PacienteDiagnostico";
import { Metadata } from "next";
import { auth } from "@/auth";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export const metadata: Metadata = {
  title: "Módulo de Diagnóstico",
};

export default async function Diagnostico({ searchParams }: SearchParamProps) {
  const pacientes = await fetchPacientesList();
  const agregar = searchParams?.agregar;
  const escoger = searchParams?.escoger;
  const session = await auth();
  const doctorId = session?.user?.id;

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Módulo de Diagnóstico</h1>
      <PacienteDiagnostico
        pacientes={pacientes}
        agregar={agregar}
        escoger={escoger}
        doctorId={doctorId}
      />
    </div>
  );
}
