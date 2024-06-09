"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Modal from "../Modal";
import { Paciente } from "@/app/lib/definitions";
import EditarPaciente from "./EditarPaciente";
import AgregarPaciente from "./AgregarPaciente";
import EliminarPaciente from "./EliminarPaciente";
import TablePacientesItem from "./TablePacientesItem";

type Props = {
  pacientes: Paciente[];
  agregar?: string;
  editar?: string;
  eliminar?: string;
};

export default function TablePacientes({
  pacientes,
  agregar,
  editar,
  eliminar,
}: Props) {
  const propPaciente: Paciente = {
    id: "",
    dni: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
  };
  const [paciente, setPaciente] = useState<Paciente>(propPaciente);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="sticky top-0 bg-white">
              <TableCell>
                <b>DNI</b>
              </TableCell>
              <TableCell>
                <b>Apellidos</b>
              </TableCell>
              <TableCell>
                <b>Nombres</b>
              </TableCell>
              <TableCell>
                <b>Fecha de Nacimiento</b>
              </TableCell>
              <TableCell>
                <b>Acciones</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <TablePacientesItem
                key={paciente.id}
                paciente={paciente}
                setPaciente={setPaciente}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {agregar && (
        <Modal>
          <AgregarPaciente />
        </Modal>
      )}
      {editar && (
        <Modal>
          <EditarPaciente paciente={paciente} />
        </Modal>
      )}
      {eliminar && (
        <Modal>
          <EliminarPaciente paciente={paciente} />
        </Modal>
      )}
    </>
  );
}
