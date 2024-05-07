import { fetchDiagnosticosPerYear } from "@/app/lib/data";
import React from "react";
import LineChart from "./LineChart";
import { generarDataPorAño } from "@/app/lib/utils";

type Props = {};

export default async function DiagPerYearChart({}: Props) {
  const tbcPerYear = await fetchDiagnosticosPerYear("Tuberculosis");
  const nPerYear = await fetchDiagnosticosPerYear("Normal");
  const DataPorAño = generarDataPorAño(tbcPerYear, nPerYear);

  return (
    <>
      <LineChart title="Diagnosticos por año" data={DataPorAño} />
    </>
  );
}
