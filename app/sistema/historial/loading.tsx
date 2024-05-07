import { HistorialTableSkeleton } from "@/app/(components)/ui/skeletons";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Historial de Diagnósticos</h1>
      <div className="flex items-center justify-between w-full">
        <div className="h-8 w-64 rounded bg-gray-100"></div>
      </div>
      <HistorialTableSkeleton />
    </div>
  );
}
