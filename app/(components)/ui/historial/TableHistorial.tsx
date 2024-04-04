import { fetchFilteredDiagnosticos } from "@/app/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import ListaDiagnosticosItem from "./ListaDiagnosticosItem";

type Props = {
  query: string;
  currentPage: number;
};

export default async function TableHistorial({ query, currentPage }: Props) {
  const diagnosticos = await fetchFilteredDiagnosticos(query, currentPage);

  return (
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
              <b>Resultado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnosticos.map((diagnostico) => (
            <ListaDiagnosticosItem
              key={diagnostico.id}
              diagnostico={diagnostico}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
