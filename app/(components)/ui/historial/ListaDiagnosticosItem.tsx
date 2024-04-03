import { DiagnosticoHistorial } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";
import { TableCell, TableRow } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {
  diagnostico: DiagnosticoHistorial;
};

export default function ListaDiagnosticosItem({ diagnostico }: Props) {
  return (
    <TableRow>
      <TableCell>{diagnostico.pac_apellidos} {diagnostico.pac_nombres}</TableCell>
      <TableCell>{diagnostico.doc_apellidos} {diagnostico.doc_nombres}</TableCell>
      <TableCell>{formatDateToLocal(diagnostico.fecha)}</TableCell>
      <TableCell>{diagnostico.resultado}</TableCell>
    </TableRow>
  );
}
