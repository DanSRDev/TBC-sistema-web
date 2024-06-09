import { DiagnosticoHistorial } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";
import { TableCell, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import React from "react";

type Props = {
  diagnostico: DiagnosticoHistorial;
  setDiagnostico: React.Dispatch<React.SetStateAction<DiagnosticoHistorial>>;
};

export default function ListaDiagnosticosItem({
  diagnostico,
  setDiagnostico,
}: Props) {
  return (
    <TableRow>
      <TableCell>
        {diagnostico.pac_apellidos} {diagnostico.pac_nombres}
      </TableCell>
      <TableCell>
        {diagnostico.doc_apellidos} {diagnostico.doc_nombres}
      </TableCell>
      <TableCell>{formatDateToLocal(diagnostico.fecha)}</TableCell>
      <TableCell>
        <Link href="?show=true">
          <VisibilityIcon
            fontSize="small"
            onClick={() => {
              setDiagnostico(diagnostico);
            }}
          />
        </Link>
      </TableCell>
      <TableCell>{diagnostico.resultado}</TableCell>
    </TableRow>
  );
}
