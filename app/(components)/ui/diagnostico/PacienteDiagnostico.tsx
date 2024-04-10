"use client";
import React, { useState } from "react";
import Modal from "@/app/(components)/ui/Modal";
import Link from "next/link";
import ListaPacientes from "@/app/(components)/ui/diagnostico/ListaPacientes";
import AgregarPaciente from "@/app/(components)/ui/pacientes/AgregarPaciente";
import { Paciente } from "@/app/lib/definitions";
import CancelIcon from "@mui/icons-material/Cancel";
import ModuloDiagnostico from "./ModuloDiagnostico";

type Props = {
  pacientes: Paciente[];
  agregar?: string;
  escoger?: string;
};

export default function PacienteDiagnostico({
  pacientes,
  agregar,
  escoger,
}: Props) {
  const [paciente, setPaciente] = useState<Paciente>();
  return (
    <>
      <div className="flex border border-black rounded-lg p-4 w-full">
        {paciente ? (
          <div className="flex justify-between items-center w-full">
            <div className="text-xl font-semibold">
              Paciente: {paciente?.apellidos} {paciente?.nombres}
            </div>
            <CancelIcon
              className="cursor-pointer"
              fontSize="large"
              color="error"
              onClick={() => setPaciente(undefined)}
            />
          </div>
        ) : (
          <div className="flex">
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
        )}
        {escoger && (
          <Modal>
            <ListaPacientes pacientes={pacientes} setPaciente={setPaciente} />
          </Modal>
        )}

        {agregar && (
          <Modal>
            <AgregarPaciente />
          </Modal>
        )}
      </div>
      <ModuloDiagnostico pacienteId={paciente?.id} />
    </>
  );
}
