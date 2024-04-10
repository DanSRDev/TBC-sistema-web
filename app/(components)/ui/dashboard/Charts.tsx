"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  normalCases: number;
  tuberculosisCases: number;
};

export default function Charts({ normalCases, tuberculosisCases }: Props) {
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
    <div>
      <Pie data={data} />
    </div>
  );
}
