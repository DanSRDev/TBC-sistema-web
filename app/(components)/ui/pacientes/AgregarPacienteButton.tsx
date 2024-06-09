"use client";
import { updateSearchParams } from "@/app/lib/utils";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function AgregarPacienteButton({}: Props) {
  const router = useRouter();
  const handleClick = () => {
    const newParams = { agregar: "true" };
    const newSearch = updateSearchParams(newParams);
    router.push(newSearch);
  };

  return (
    <a onClick={handleClick}>
      <AddBoxIcon className="cursor-pointer" fontSize="large" />
    </a>
  );
}
