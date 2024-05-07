import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function PacientesTableSkeleton() {
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
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
            <PacientesTableRowSkeleton />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function PacientesTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-5 w-16 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-40 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-40 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell className="flex gap-5">
        <div className="h-5 w-5 rounded bg-gray-100"></div>
        <div className="h-5 w-5 rounded bg-gray-100"></div>
      </TableCell>
    </TableRow>
  );
}

export function HistorialTableSkeleton() {
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
                <b>Resultado</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
            <HistorialTableRowSkeleton />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function HistorialTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-5 w-80 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-80 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 rounded bg-gray-100"></div>
      </TableCell>
      <TableCell>
        <div className="h-5 w-20 rounded bg-gray-100"></div>
      </TableCell>
    </TableRow>
  );
}

export function ModuloDiagnosticoSkeleton() {
  return (
    <>
      <div className="flex border border-black rounded-lg p-4 w-full">
        <div className="flex">
          <div className="h-16 w-48 rounded bg-gray-100"></div>
          <div className="h-16 w-48 rounded bg-gray-100 ml-4"></div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-4 border border-black rounded-lg mt-4 w-full h-full">
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="h-20 w-72 rounded bg-gray-100"></div>
            <div className="h-20 w-72 rounded bg-gray-100 mt-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="h-5 w-36 rounded-md bg-gray-100" />
      <div className="flex gap-3">
        <div className="h-5 w-28 mb-4 rounded-md bg-gray-100" />
        <div className="h-5 w-28 mb-4 rounded-md bg-gray-100" />
      </div>
      <div className="w-full rounded-xl bg-gray-100 p-4">
        <div className="mt-0 grid h-52 grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
      </div>
    </div>
  );
}

export function PieChartSkeleton() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 p-8">
      <div className="h-5 w-36 rounded-md bg-gray-100" />
      <div className="flex gap-3 ">
        <div className="h-5 w-28 mb-4 rounded-md bg-gray-100" />
        <div className="h-5 w-28 mb-4 rounded-md bg-gray-100" />
      </div>
      <div className="min-w-full aspect-square rounded-full bg-gray-100" />
    </div>
  );
}
