import { deletePaciente } from "@/app/lib/actions";
import { Paciente } from "@/app/lib/definitions";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  paciente: Paciente;
};

export default function EliminarPaciente({ paciente }: Props) {
  const router = useRouter();
  const deletePacienteWithId = deletePaciente.bind(null, paciente.id);
  return (
    <form action={deletePacienteWithId}>
      <div className="flex flex-col gap-3 w-96">
        <h3 className="text-2xl font-bold text-gray-900">Eliminar paciente</h3>
        <p>¿Esta seguro de eliminar el paciente {paciente.apellidos} {paciente.nombres}?</p>
        <div className="text-right">
          <Button color="primary" type="submit">
            Eliminar Paciente
          </Button>
          <Button onClick={router.back}>Cancelar</Button>
        </div>
      </div>
    </form>
  );
}
