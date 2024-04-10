import { Button, TextField } from "@mui/material";
import React from "react";
import { createPaciente } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

type Props = {};

export default function AgregarPaciente({}: Props) {
  const router = useRouter();
  return (
    <form action={createPaciente}>
      <div className="flex flex-col gap-3 w-96">
        <h3 className="text-2xl font-bold text-gray-900">
          Agregar nuevo paciente
        </h3>
        <TextField name="dni" label="DNI" />
        <TextField name="apellidos" label="Apellidos" />
        <TextField name="nombres" label="Nombres" />
        <TextField name="fechaNacimiento" label="Fecha de nacimiento" />
        <div className="text-right">
          <Button color="primary" type="submit">
            Agregar Paciente
          </Button>
          <Button onClick={router.back}>Cancelar</Button>
        </div>
      </div>
    </form>
  );
}
