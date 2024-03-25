"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { clsx } from "clsx";
import { handlePredictClick } from "@/app/lib/diagnose";
import Modal from "@/app/(components)/ui/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Dashboard({ searchParams }: SearchParamProps) {
  const [predictionResult, setPredictionResult] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imgDisplay, setImgDisplay] = useState<string>("disabled");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const imageRef = useRef(null);

  const [switchState, setSwitchState] = useState<boolean>(false);
  const [usedModel, setUsedModel] = useState<string>("Basic Model");

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
          setBtnDisabled(false);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  const handleClick = async () => {
    const result = await handlePredictClick(imageSrc, imageRef, switchState);
    if (result) {
      setPredictionResult("Resultado de la detección: " + result);
    }
  };

  const agregar = searchParams?.agregar;
  const escoger = searchParams?.escoger;
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
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
      <h1 className="my-8 text-5xl font-semibold">Módulo de Diagnóstico</h1>
      <div className="flex border border-black rounded-lg p-4 w-full">
        <Link
          href="?escoger=true"
          className="flex border border-black p-4 rounded-xl text-xl text-center font-bold cursor-pointer"
        >
          Escoger Paciente
        </Link>
        <Link
          href="?agregar=true"
          className="flex ml-4 border border-black p-4 rounded-xl text-xl text-center font-bold cursor-pointer"
        >
          Agregar Paciente
        </Link>
      </div>

      {agregar && (
        <Modal>
          <h3 className="text-2xl font-bold text-gray-900">Modal Title</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">Modal Body</p>
          </div>
          <div className="flex justify-center mt-4">
            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={router.back}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      <div className="flex flex-col justify-center items-center mb-4 border border-black rounded-lg mt-4 w-full h-full">
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
              onChange={handleFileChange}
              className="disabled"
            />
            <label
              htmlFor="fileInput"
              className="button bg-blue-600 hover:bg-blue-400"
            >
              Cargar imagen
            </label>
            <button
              id="predictButton"
              onClick={handleClick}
              className={clsx(
                `button mt-6`,
                { "bg-neutral-300 ": btnDisabled },
                { "bg-blue-600 hover:bg-blue-400": !btnDisabled }
              )}
              disabled={btnDisabled}
            >
              Realizar Diagnóstico
            </button>
          </div>
        </div>
        <div id="predictionResult" className="text-2xl mt-6 h-10">
          {predictionResult}
        </div>
      </div>
    </div>
  );
}
