'use client';
import { fetchPacientesList } from "@/app/lib/data";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BackButton from "./BackButton";
import { Paciente } from "@/app/lib/definitions";

type Props = {
  paciente: string,
  pacientes: Paciente[]
};

export default function ListaPacientes({paciente, pacientes}: Props) {

  const handleClickPaciente = (name :string) => {
    paciente= name;
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-semibold">Lista de pacientes</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>DNI</b>
              </TableCell>
              <TableCell>
                <b>Nombres</b>
              </TableCell>
              <TableCell>
                <b>Apellidos</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id} className="cursor-pointer hover:bg-blue-100" onClick={() => handleClickPaciente(paciente.nombres)}>
                <TableCell>{paciente.dni}</TableCell>
                <TableCell>{paciente.apellidos}</TableCell>
                <TableCell>{paciente.nombres}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-right">
        <Button>Escoger paciente</Button>
        <BackButton />
      </div>
    </div>
  );
}
