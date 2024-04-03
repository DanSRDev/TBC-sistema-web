import ListaDiagnosticosItem from "@/app/(components)/ui/historial/ListaDiagnosticosItem";
import { fetchHistorialDiagnosticos } from "@/app/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

type Props = {};

export default async function Historial({}: Props) {
  const diagnosticos = await fetchHistorialDiagnosticos();
  console.log("diagnosticos", diagnosticos);

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Historial de Diagnósticos</h1>
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
    </div>
  );
}
