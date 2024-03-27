import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import BackButton from "./BackButton";

type Props = {};

export default function AgregarPaciente({}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-bold text-gray-900">
        Agregar nuevo paciente
      </h3>
      <TextField
        name="lastName"
        label="Apellidos"
        sx={{ width: "100%" }}
        /*             onChange={handleChange} */
      />
      <TextField
        name="firstName"
        label="Nombres"
        sx={{ width: "100%" }}
        /*             onChange={handleChange} */
      />
      <TextField
        name="birthdate"
        label="Fecha de nacimiento"
        sx={{ width: "100%" }}
        /*             onChange={handleChange} */
      />
      <div className="text-right">
        <Button
          color="primary"
          /*               onClick={() => {
                if (dataCustomer.ruc !== "") {
                  createCustomer({
                    dni: dataCustomer.dni,
                    lastName: dataCustomer.lastName,
                    firstName: dataCustomer.firstName,
                    ruc: dataCustomer.ruc,
                  });
                } else {
                  createCustomer({
                    dni: dataCustomer.dni,
                    lastName: dataCustomer.lastName,
                    firstName: dataCustomer.firstName,
                  });
                }
              }} */
        >
          Insertar
        </Button>
        <BackButton />
      </div>
    </div>
  );
}
