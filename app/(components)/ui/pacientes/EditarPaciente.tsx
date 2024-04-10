import { Button, TextField } from "@mui/material";
import React from "react";
import { createPaciente } from "@/app/lib/actions";
import { Paciente } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { formatDateToLocal } from "@/app/lib/utils";

type Props = {
  paciente: Paciente;
};

export default function EditarPaciente({ paciente }: Props) {
  const router = useRouter();
  return (
    <form action={createPaciente}>
      <div className="flex flex-col gap-3 w-96">
        <h3 className="text-2xl font-bold text-gray-900">Editar paciente</h3>
        <TextField name="dni" label="DNI" value={paciente?.dni} />
        <TextField
          name="apellidos"
          label="Apellidos"
          value={paciente?.apellidos}
        />
        <TextField name="nombres" label="Nombres" value={paciente?.nombres} />
        <TextField
          name="fechaNacimiento"
          label="Fecha de nacimiento"
          value={formatDateToLocal(paciente?.fecha_nacimiento)}
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
