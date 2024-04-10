"use client";
import { formatDateToLocal } from "@/app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Modal from "../Modal";
import { Paciente } from "@/app/lib/definitions";
import EditarPaciente from "./EditarPaciente";
import Link from "next/link";
import AgregarPaciente from "./AgregarPaciente";

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
  const [paciente, setPaciente] = useState<Paciente>();

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
              <TableRow key={paciente.id}>
                <TableCell>{paciente.dni}</TableCell>
                <TableCell>{paciente.apellidos}</TableCell>
                <TableCell>{paciente.nombres}</TableCell>
                <TableCell>
                  {formatDateToLocal(paciente.fecha_nacimiento)}
                </TableCell>
                <TableCell>
                  <Link href="?editar=true">
                    <EditIcon
                      fontSize="small"
                      onClick={() => {
                        setPaciente(paciente);
                      }}
                    />
                  </Link>
                  <DeleteIcon fontSize="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {agregar && (
        <Modal>
          <AgregarPaciente />
        </Modal>
      )}
      {editar && paciente && (
        <Modal>
          <EditarPaciente paciente={paciente} />
        </Modal>
      )}
    </>
  );
}
