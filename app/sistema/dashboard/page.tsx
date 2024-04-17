import LineChart from "@/app/(components)/ui/dashboard/LineChart";
import PieChart from "@/app/(components)/ui/dashboard/PieChart";
import {
  fetchCases,
  fetchDiagnosticosLastYear,
  fetchDiagnosticosPerYear,
} from "@/app/lib/data";
import { generarDataLastYear, generarDataPorAño } from "@/app/lib/utils";
import React from "react";

type Props = {};

export default async function Dashboard({}: Props) {
  const tuberculosis = await fetchCases("Tuberculosis");
  const normal = await fetchCases("Normal");
  const tbcPerYear = await fetchDiagnosticosPerYear("Tuberculosis");
  const nPerYear = await fetchDiagnosticosPerYear("Normal");
  const tbcLastYear = await fetchDiagnosticosLastYear("Tuberculosis");
  const nLastYear = await fetchDiagnosticosLastYear("Normal");

  const DataPorAño = generarDataPorAño(tbcPerYear, nPerYear);
  const DataUltimoAño = generarDataLastYear(tbcLastYear, nLastYear);

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Dashboard</h1>
      <div className="flex items-center justify-center w-full h-full gap-10 mb-8">
        <div className="flex flex-col justify-center gap-10 w-[50%] h-full">
          <div className="h-full">
            <LineChart title="Diagnosticos por año" data={DataPorAño} />
          </div>
          <div className="h-full">
            <LineChart
              title="Diagnosticos del ultimo año"
              data={DataUltimoAño}
            />
          </div>
        </div>
        <div className="w-[30%]">
          <PieChart normalCases={normal} tuberculosisCases={tuberculosis} />
        </div>
      </div>
    </div>
  );
}
