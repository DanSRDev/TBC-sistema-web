import React from "react";
import PieChart from "./PieChart";
import { fetchCases } from "@/app/lib/data";

type Props = {};

export default async function CasesChart({}: Props) {
  const tuberculosis = await fetchCases("Tuberculosis");
  const normal = await fetchCases("Normal");
  return (
    <>
      <PieChart normalCases={normal} tuberculosisCases={tuberculosis} />
    </>
  );
}
