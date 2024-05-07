import { PacientesTableSkeleton } from "@/app/(components)/ui/skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Lista de Pacientes</h1>
      <div className="flex items-center justify-between w-full">
        <div className="h-8 w-64 rounded bg-gray-100"></div>
      </div>
      <PacientesTableSkeleton />
    </div>
  );
}
