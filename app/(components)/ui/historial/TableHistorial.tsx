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
import TableDiagnosticosItem from "./TableDiagnosticosItem";
import Modal from "../Modal";
import { DiagnosticoHistorial } from "@/app/lib/definitions";
import ImagenDiagnostico from "./ImagenDiagnostico";

type Props = {
  diagnosticos: DiagnosticoHistorial[];
  show?: string;
};

export default function TableHistorial({ diagnosticos, show }: Props) {
  const propDiagnostico: DiagnosticoHistorial = {
    id: "",
    doc_nombres: "",
    doc_apellidos: "",
    pac_nombres: "",
    pac_apellidos: "",
    fecha: "",
    imagen: "",
    resultado: "Normal",
  };
  const [diagnostico, setDiagnostico] =
    useState<DiagnosticoHistorial>(propDiagnostico);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="sticky top-0 bg-white">
              <TableCell>
                <b>Paciente</b>
              </TableCell>
              <TableCell>
                <b>Doctor</b>
              </TableCell>
              <TableCell>
                <b>Fecha</b>
              </TableCell>
              <TableCell>
                <b>Imagen</b>
              </TableCell>
              <TableCell>
                <b>Resultado</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnosticos.map((diagnostico) => (
              <TableDiagnosticosItem
                key={diagnostico.id}
                diagnostico={diagnostico}
                setDiagnostico={setDiagnostico}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {show && (
        <Modal>
          <ImagenDiagnostico diagnostico={diagnostico} />
        </Modal>
      )}
    </>
  );
}
