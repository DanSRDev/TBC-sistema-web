"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

type Props = {
  normalCases: number;
  tuberculosisCases: number;
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ normalCases, tuberculosisCases }: Props) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Cantidad de diagnosticos",
      },
    },
  };

  const data = {
    labels: ["Normal", "Tuberculosis"],
    datasets: [
      {
        label: "Resultados de diagnosticos",
        data: [normalCases, tuberculosisCases],
        backgroundColor: ["rgb(82, 209, 8)", "rgb(235, 52, 79)"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <Pie data={data} options={options}/>
    </>
  );
}
