import React from "react";
import Modal from "@/app/(components)/ui/Modal";
import Link from "next/link";
import ListaPacientes from '@/app/(components)/ui/diagnostico/ListaPacientes'
import ModuloDiagnostico from "@/app/(components)/ui/diagnostico/ModuloDiagnostico";
import AgregarPaciente from "@/app/(components)/ui/diagnostico/AgregarPaciente";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Diagnostico({ searchParams }: SearchParamProps) {

  const agregar = searchParams?.agregar;
  const escoger = searchParams?.escoger;

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Módulo de Diagnóstico</h1>
      <div className="flex border border-black rounded-lg p-4 w-full">
        <Link
          href="?escoger=true"
          className="flex border border-black p-4 rounded-xl text-xl text-center font-bold cursor-pointer"
        >
          Escoger Paciente
        </Link>
        <Link
          href="?agregar=true"
          className="flex ml-4 border border-black p-4 rounded-xl text-xl text-center font-bold cursor-pointer"
        >
          Agregar Paciente
        </Link>
      </div>

      {escoger && (
        <Modal>
          <ListaPacientes/>
        </Modal>
      )}

      {agregar && (
        <Modal>
          <AgregarPaciente/>
        </Modal>
      )}
      <ModuloDiagnostico/>
    </div>
  );
}
