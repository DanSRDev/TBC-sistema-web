import Charts from "@/app/(components)/ui/dashboard/Charts";
import { fetchNormalCases, fetchTuberculosisCases } from "@/app/lib/data";
import { norm } from "@tensorflow/tfjs";
import React from "react";

type Props = {};

export default async function Dashboard({}: Props) {
  const normal = await fetchNormalCases();
  const tuberculosis = await fetchTuberculosisCases();

  console.log(normal);
  console.log(tuberculosis);
  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Dashboard</h1>
      <Charts normalCases={normal} tuberculosisCases={tuberculosis} />
    </div>
  );
}
