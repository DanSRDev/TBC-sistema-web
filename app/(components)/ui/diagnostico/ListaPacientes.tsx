import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Paciente } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import ListaPacientesItem from "./ListaPacientesItem";

type Props = {
  pacientes: Paciente[];
  setPaciente: React.Dispatch<React.SetStateAction<Paciente | undefined>>;
};

export default function ListaPacientes({ pacientes, setPaciente }: Props) {
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente>();
  const router = useRouter();

  const applySelectedPaciente = () => {
    setPaciente(selectedPaciente);
    router.back();
  };

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
                <b>Apellidos</b>
              </TableCell>
              <TableCell>
                <b>Nombres</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => (
              <ListaPacientesItem
                key={paciente.id}
                paciente={paciente}
                setSelectedPaciente={setSelectedPaciente}
                clicked={selectedPaciente === paciente}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-right">
        <Button
          onClick={applySelectedPaciente}
          disabled={selectedPaciente == undefined}
        >
          Escoger paciente
        </Button>
        <Button onClick={router.back}>Cancelar</Button>
      </div>
    </div>
  );
}
