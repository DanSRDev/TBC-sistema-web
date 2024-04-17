"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Datos } from "@/app/lib/definitions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  title: string;
  data: Datos[][];
};

export default function LineChart({ title, data }: Props) {
  const tbcData = data[0];
  const normalData = data[1];

  // Extraer años en un arreglo
  const años = tbcData.map((item) => item.año);

  // Extraer cantidades en un arreglo
  const cantidadTbc = tbcData.map((item) => item.cantidad);
  const cantidadNormal = normalData.map((item) => item.cantidad);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    maintainAspectRatio: false,
  };

  const labels = años;

  const dataLine = {
    labels,
    datasets: [
      {
        label: "Normal",
        data: cantidadNormal,
        borderColor: "rgb(82, 209, 8)",
        backgroundColor: "rgba(82, 209, 8, 0.5)",
      },
      {
        label: "Tuberculosis",
        data: cantidadTbc,
        borderColor: "rgb(235, 52, 79)",
        backgroundColor: "rgba(235, 52, 79, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={dataLine} />
    </>
  );
}
