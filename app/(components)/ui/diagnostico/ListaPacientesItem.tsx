import { Paciente } from "@/app/lib/definitions";
import { TableCell, TableRow } from "@mui/material";
import clsx from "clsx";
import React from "react";

type Props = {
  paciente: Paciente;
  setSelectedPaciente: React.Dispatch<
    React.SetStateAction<Paciente | undefined>
  >;
  clicked: boolean;
};

export default function ListaPacientesItem({
  paciente,
  setSelectedPaciente,
  clicked
}: Props) {
  return (
    <TableRow
      className={clsx("cursor-pointer hover:bg-blue-100", {
        "bg-blue-200": clicked,
      })}
      onClick={() => {
        setSelectedPaciente(paciente);
      }}
    >
      <TableCell>{paciente.dni}</TableCell>
      <TableCell>{paciente.apellidos}</TableCell>
      <TableCell>{paciente.nombres}</TableCell>
    </TableRow>
  );
}
