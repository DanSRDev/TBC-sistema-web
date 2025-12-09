import React, { ChangeEvent, useRef, useState } from "react";
import { clsx } from "clsx";
import { handlePredictClick } from "@/app/lib/diagnose";
import { createDiagnostico } from "@/app/lib/actions";
import ModelButton from "./ModelButton";

type Props = {
  pacienteId: string | undefined;
  doctorId: string | undefined;
};

export default function ModuloDiagnostico({ pacienteId, doctorId }: Props) {
  const [predictionResult, setPredictionResult] = useState<string>("");
  const [diagnosticoState, setDiagnosticoState] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imgDisplay, setImgDisplay] = useState<string>("disabled");
  const imageRef = useRef(null);

  const [usedModel, setUsedModel] = useState<string>("Basic Model");
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);

  if (pacienteId === undefined && imageSrc !== "") {
    setImgDisplay("disabled");
    setImageSrc("");
    setPredictionResult("");
    setDiagnosticoState("");
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setPredictionResult(""); // Reinicia el resultado de la predicción
    setDiagnosticoState("");
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
  const cloudinary = require("cloudinary").v2;
  // Return "https" URLs by setting secure: true
  cloudinary.config({
    secure: true,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
  });

  const uploadImage = async (imagePath: string) => {
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "images",
        quality: "auto",
        fetch_format: "auto",
      });
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    
    setPredictionResult("Realizando diagnostico...");
    setDiagnosticoState("");

    const result = await handlePredictClick(imageSrc, imageRef, usedModel);
    if (result) {
      setPredictionResult("Resultado de la detección: " + result);
      setDiagnosticoState("Registrando diagnóstico...");
    }

    if (typeof file !== "string") {
      alert("Please select a valid image");
      return;
    }

    console.log("subiendo imagen");
    const imagenUrl = await uploadImage(file);
    if (imagenUrl) {
      console.log("imagen subida");
    } else {
      console.log("Error al subir imagen");
    }

    if (result && pacienteId && doctorId && imagenUrl) {
      await createDiagnostico(doctorId, pacienteId, result, imagenUrl);
      setDiagnosticoState("Diagnóstico registrado");
    } else {
      setDiagnosticoState("Error al registrar diagnóstico");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-4 border border-black rounded-lg mt-4 w-full h-full">
      <ModelButton model={usedModel} setModel={setUsedModel} />
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
      <div id="diagnosticoState" className="text-lg mt-4 h-10">
        {diagnosticoState}
      </div>
    </div>
  );
}
