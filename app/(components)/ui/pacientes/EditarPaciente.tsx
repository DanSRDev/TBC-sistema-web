import { Button, TextField } from "@mui/material";
import React from "react";
import { PacienteState, updatePaciente } from "@/app/lib/actions";
import { Paciente } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { formatDateToLocal } from "@/app/lib/utils";
import { useFormState } from "react-dom";

type Props = {
  paciente: Paciente;
};

export default function EditarPaciente({ paciente }: Props) {
  const router = useRouter();
  const initialState = { message: null, errors: {} };
  const updatePacienteWithId = updatePaciente.bind(null, paciente.id);
  const [state, dispatch] = useFormState<PacienteState, FormData>(
    updatePacienteWithId,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-3 w-96">
        <h3 className="text-2xl font-bold text-gray-900">Editar paciente</h3>
        <TextField
          name="dni"
          label="DNI"
          defaultValue={paciente?.dni}
          aria-describedby="dni-error"
        />
        <div id="dni-error" aria-live="polite" aria-atomic="true">
          {state.errors?.dni &&
            state.errors.dni.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <TextField
          name="apellidos"
          label="Apellidos"
          defaultValue={paciente?.apellidos}
          aria-describedby="apellidos-error"
        />
        <div id="apellidos-error" aria-live="polite" aria-atomic="true">
          {state.errors?.apellidos &&
            state.errors.apellidos.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <TextField
          name="nombres"
          label="Nombres"
          defaultValue={paciente?.nombres}
          aria-describedby="nombres-error"
        />
        <div id="nombres-error" aria-live="polite" aria-atomic="true">
          {state.errors?.nombres &&
            state.errors.nombres.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <TextField
          name="fechaNacimiento"
          label="Fecha de nacimiento"
          defaultValue={formatDateToLocal(paciente?.fecha_nacimiento)}
          aria-describedby="fecha-error"
        />
        <div id="fecha-error" aria-live="polite" aria-atomic="true">
          {state.errors?.fechaNacimiento &&
            state.errors.fechaNacimiento.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
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
