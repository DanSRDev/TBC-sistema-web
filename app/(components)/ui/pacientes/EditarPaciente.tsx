import { Button, TextField } from "@mui/material";
import React from "react";
import { updatePaciente } from "@/app/lib/actions";
import { Paciente } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { formatDateToLocal } from "@/app/lib/utils";

type Props = {
  paciente: Paciente;
};

export default function EditarPaciente({ paciente }: Props) {
  const router = useRouter();
  const updatePacienteWithId = updatePaciente.bind(null, paciente.id);

  return (
    <form action={updatePacienteWithId}>
      <div className="flex flex-col gap-3 w-96">
        <h3 className="text-2xl font-bold text-gray-900">Editar paciente</h3>
        <TextField name="dni" label="DNI" defaultValue={paciente?.dni} />
        <TextField
          name="apellidos"
          label="Apellidos"
          defaultValue={paciente?.apellidos}
        />
        <TextField name="nombres" label="Nombres" defaultValue={paciente?.nombres} />
        <TextField
          name="fechaNacimiento"
          label="Fecha de nacimiento"
          defaultValue={formatDateToLocal(paciente?.fecha_nacimiento)}
        />
        <div className="text-right">
          <Button color="primary" type="submit">
            Editar Paciente
          </Button>
          <Button onClick={router.back}>Cancelar</Button>
        </div>
      </div>
    </form>
  );
}
