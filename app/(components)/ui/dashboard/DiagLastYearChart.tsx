import React from "react";
import LineChart from "./LineChart";
import { fetchDiagnosticosLastYear } from "@/app/lib/data";
import { generarDataLastYear } from "@/app/lib/utils";

type Props = {};

export default async function DiagLastYearChart({}: Props) {
  const tbcLastYear = await fetchDiagnosticosLastYear("Tuberculosis");
  const nLastYear = await fetchDiagnosticosLastYear("Normal");

  const DataUltimoAño = generarDataLastYear(tbcLastYear, nLastYear);
  return (
    <>
      <LineChart title="Diagnosticos del ultimo año" data={DataUltimoAño} />
    </>
  );
}
