import { Paciente } from "@/app/lib/definitions";
import { formatDateToLocal, updateSearchParams } from "@/app/lib/utils";
import { TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  paciente: Paciente;
  setPaciente: React.Dispatch<React.SetStateAction<Paciente>>;
};

export default function TablePacientesItem({ paciente, setPaciente }: Props) {
  const router = useRouter();

  const handleClick = (params: { [key: string]: string }) => {
    setPaciente(paciente);
    const newSearch = updateSearchParams(params);
    router.push(newSearch);
  };

  return (
    <TableRow key={paciente.id}>
      <TableCell>{paciente.dni}</TableCell>
      <TableCell>{paciente.apellidos}</TableCell>
      <TableCell>{paciente.nombres}</TableCell>
      <TableCell>{formatDateToLocal(paciente.fecha_nacimiento)}</TableCell>
      <TableCell className="flex gap-5">
        <a onClick={() => handleClick({ editar: "true" })}>
          <EditIcon fontSize="small" />
        </a>
        <a onClick={() => handleClick({ eliminar: "true" })}>
          <DeleteIcon fontSize="small" />
        </a>
      </TableCell>
    </TableRow>
  );
}
