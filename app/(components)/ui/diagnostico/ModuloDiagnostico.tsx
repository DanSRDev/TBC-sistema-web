import React, { ChangeEvent, useRef, useState } from "react";
import { clsx } from "clsx";
import { handlePredictClick } from "@/app/lib/diagnose";
import { createDiagnostico, uploadImage } from "@/app/lib/actions";

type Props = {
  pacienteId: string | undefined;
  doctorId: string | undefined;
};

export default function ModuloDiagnostico({ pacienteId, doctorId }: Props) {
  const [predictionResult, setPredictionResult] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imgDisplay, setImgDisplay] = useState<string>("disabled");
  const imageRef = useRef(null);

  const [switchState, setSwitchState] = useState<boolean>(false);
  const [usedModel, setUsedModel] = useState<string>("Basic Model");

  const [file, setFile] = useState<string | ArrayBuffer | null>(null);

  if (pacienteId === undefined && imageSrc !== "") {
    setImgDisplay("disabled");
    setImageSrc("");
    setPredictionResult("");
  }

  const handleSwitchToggle = () => {
    setSwitchState(!switchState);
    if (switchState) {
      setUsedModel("Basic Model");
    } else {
      setUsedModel("MobileNet");
    }
  };

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setPredictionResult(""); // Reinicia el resultado de la predicción
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImageSrc(e.target.result as string);
          setImgDisplay("");
        }
      };

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    }
  }

  const handleClick = async () => {
    const result = await handlePredictClick(imageSrc, imageRef, switchState);
    if (result) {
      setPredictionResult("Resultado de la detección: " + result);
    }

    if (typeof file !== "string") {
      alert("Please select a valid image");
      return;
    }

    console.log("subiendo imagen");
    const imagenUrl = await uploadImage(file);
    console.log("imagen subida");

    if (result && pacienteId && doctorId && imagenUrl) {
      await createDiagnostico(doctorId, pacienteId, result, imagenUrl);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-4 border border-black rounded-lg mt-4 w-full h-full">
      <div className="switch-container text-center">
        <label className="switch">
          <input
            type="checkbox"
            checked={switchState}
            onChange={handleSwitchToggle}
          />
          <span className="btnSwitch"></span>
        </label>
        <p>{usedModel}</p>
      </div>
      <div className="flex items-center">
        <img
          ref={imageRef}
          id="imagePreview"
          alt="imagePreview"
          src={imageSrc}
          className={imgDisplay}
        />
        <div className="flex flex-col">
          <input
            type="file"
            id="fileInput"
            onChange={(event) => {
              handleFileChange(event);
              event.target.value = "";
            }}
            className="disabled"
            disabled={pacienteId == undefined}
          />
          <label
            htmlFor="fileInput"
            className={clsx(
              "button",
              { "bg-neutral-300 ": pacienteId == undefined },
              { "bg-blue-600 hover:bg-blue-400": pacienteId != undefined }
            )}
          >
            Cargar imagen
          </label>
          <button
            id="predictButton"
            onClick={handleClick}
            className={clsx(
              `button mt-6`,
              { "bg-neutral-300 ": imageSrc == "" || pacienteId == undefined },
              {
                "bg-blue-600 hover:bg-blue-400":
                  imageSrc != "" && pacienteId != undefined,
              }
            )}
            disabled={imageSrc == "" || pacienteId == undefined}
          >
            Realizar Diagnóstico
          </button>
        </div>
      </div>
      <div id="predictionResult" className="text-2xl mt-6 h-10">
        {predictionResult}
      </div>
    </div>
  );
}
