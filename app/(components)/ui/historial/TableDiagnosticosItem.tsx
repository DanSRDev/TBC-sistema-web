import { DiagnosticoHistorial } from "@/app/lib/definitions";
import { formatDateToLocal, updateSearchParams } from "@/app/lib/utils";
import { TableCell, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  diagnostico: DiagnosticoHistorial;
  setDiagnostico: React.Dispatch<React.SetStateAction<DiagnosticoHistorial>>;
};

export default function TableDiagnosticosItem({
  diagnostico,
  setDiagnostico,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    setDiagnostico(diagnostico);
    const newParams = { show: "true" };
    const newSearch = updateSearchParams(newParams);
    router.push(newSearch);
  };

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
        <a onClick={handleClick}>
          <VisibilityIcon fontSize="small" />
        </a>
      </TableCell>
      <TableCell>{diagnostico.resultado}</TableCell>
    </TableRow>
  );
}
