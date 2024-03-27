import { fetchPacientesList } from "@/app/lib/data";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import BackButton from "./BackButton";

type Props = {};

export default async function ListaPacientes({}: Props) {
  const pacientes = await fetchPacientesList();

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell>{paciente.apellidos}</TableCell>
                <TableCell>{paciente.nombres}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BackButton />
    </div>
  );
}
