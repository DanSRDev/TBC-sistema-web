import ListaDiagnosticosItem from "@/app/(components)/ui/historial/ListaDiagnosticosItem";
import Pagination from "@/app/(components)/ui/historial/Pagination";
import Search from "@/app/(components)/ui/historial/Search";
import TableHistorial from "@/app/(components)/ui/historial/TableHistorial";
import {
  fetchDiagnosticosPages,
  fetchHistorialDiagnosticos,
} from "@/app/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Historial",
};

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function Historial({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchDiagnosticosPages(query);

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Historial de Diagnósticos</h1>
      <div className="flex items-start w-full">
        <Search placeholder="Buscar diagnosticos..." />
      </div>
      <TableHistorial query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
