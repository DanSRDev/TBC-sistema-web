import Pagination from "@/app/(components)/ui/historial/Pagination";
import Search from "@/app/(components)/ui/historial/Search";
import TableHistorial from "@/app/(components)/ui/historial/TableHistorial";
import {
  fetchDiagnosticosPages,
  fetchFilteredDiagnosticos,
} from "@/app/lib/data";
import { Metadata } from "next";
import React from "react";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
    currentPage?: number;
    show?: string;
  };
};

export const metadata: Metadata = {
  title: "Historial",
};

export default async function Historial({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchDiagnosticosPages(query);
  const diagnosticos = await fetchFilteredDiagnosticos(query, currentPage);
  const show = searchParams?.show;

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Historial de Diagnósticos</h1>
      <div className="flex items-start w-full">
        <Search placeholder="Buscar diagnosticos..." />
      </div>
      <TableHistorial diagnosticos={diagnosticos} show={show} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
