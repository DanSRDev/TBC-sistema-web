import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import { useRouter } from "next/navigation";
import { DiagnosticoHistorial } from "@/app/lib/definitions";

type Props = {
  diagnostico: DiagnosticoHistorial;
};

export default function ImagenDiagnostico({ diagnostico }: Props) {
  const router = useRouter();

  return (
    <div className="w-80">
      <div className="flex w-full justify-end">
        <CloseIcon onClick={router.back} />
      </div>
      <div className="w-full">
        <img src={diagnostico.imagen} alt="radiografia" />
      </div>
    </div>
  );
}
