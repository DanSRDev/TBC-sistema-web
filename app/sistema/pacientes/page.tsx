import Pagination from "@/app/(components)/ui/historial/Pagination";
import Search from "@/app/(components)/ui/historial/Search";
import TablePacientes from "@/app/(components)/ui/pacientes/TablePacientes";
import { fetchFilteredPacientes, fetchPacientesPages } from "@/app/lib/data";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
    currentPage?: number;
    agregar?: string;
    editar?: string;
    eliminar?: string;
  };
};

export const metadata: Metadata = {
  title: 'Pacientes',
};

export default async function page({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPacientesPages(query);
  const pacientes = await fetchFilteredPacientes(query, currentPage);
  const agregar = searchParams?.agregar;
  const editar = searchParams?.editar;
  const eliminar = searchParams?.eliminar;

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Lista de Pacientes</h1>
      <div className="flex items-center justify-between w-full">
        <Search placeholder="Buscar pacientes..." />
        <Link href="?agregar=true">
          <AddBoxIcon className="cursor-pointer" fontSize="large" />
        </Link>
      </div>
      <TablePacientes
        pacientes={pacientes}
        agregar={agregar}
        editar={editar}
        eliminar={eliminar}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
