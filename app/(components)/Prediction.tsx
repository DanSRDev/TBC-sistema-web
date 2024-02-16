"use client";

import React, { useState, useRef, ChangeEvent } from "react";

import * as tf from "@tensorflow/tfjs";

type Props = {};

export default function Prediction({}: Props) {
  const [predictionResult, setPredictionResult] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imgDisplay, setImgDisplay] = useState<string>("disabled");
  const [btnDisabled, setBtnDisabled] = useState<string>("bg-neutral-500");
  const imageRef = useRef(null);

  // Carga de modelos

  async function loadModel() {
    console.log("Cargando modelo...");
    const model = await tf.loadLayersModel("model/model.json");
    console.log("Modelo cargado...");
    return model;
  }
  
  async function loadModelMv() {
    console.log("Cargando modelo...");
    const model = await tf.loadGraphModel("modelmv/model.json");
    console.log("Modelo cargado...");
    return model;
  }

  // Preprocesamiento de imagenes

  function preprocessImage(image: HTMLImageElement) {
    // Cargamos la imagen en escala de grises (1 canal).
    const tensor: any = tf.browser.fromPixels(image).mean(2).expandDims(2);

    console.log("img original " + tensor.shape);

    const processedImage = preprocess(tensor);
    return processedImage;
  }

  function preprocessImageMv(image: HTMLImageElement) {
    // Cargamos la imagen en escala de grises (1 canal).
    const tensor = tf.browser.fromPixels(image);

    console.log("img original " + tensor.shape);

    const processedImage = preprocess(tensor);
    return processedImage;
  }

  function preprocess(tensor: tf.Tensor3D) {

    // Cambiamos el tamaño de la imagen a 224x224
    const resized = tf.image.resizeBilinear(tensor, [224, 224]);
    console.log("img reshaped " + resized.shape);

    const offset = tf.scalar(255.0);

    // Normalizamos la imagen
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    console.log("img normalized " + normalized.shape);

    const batched = normalized.expandDims(0);
    console.log("img batched " + batched.shape);

    return batched;
  }

  // Carga de imagen

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setPredictionResult(""); // Reinicia el resultado de la predicción
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImageSrc(e.target.result as string);
          setImgDisplay("");
          setBtnDisabled("bg-blue-600 hover:bg-blue-400");
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // Realizar diagnostico

  async function performInference(image: HTMLImageElement) {
    let model;
    let processedImage;

    if (switchState) {
      console.log("MobileNet");
      model = await loadModelMv();
      processedImage = preprocessImageMv(image);
    } else {
      console.log("Basic Model");
      model = await loadModel();
      processedImage = preprocessImage(image);
    }

    // Realiza la inferencia con el modelo.
    const predictions = await (model.predict(processedImage)as tf.Tensor).dataSync();
    const predictionsArray = Array.from(predictions);
    
    // Encuentra la clase con la probabilidad más alta
    const maxIndex = predictions.indexOf(Math.max.apply(null, predictionsArray));

    // Definición de clases
    const classes = ["Normal", "Tuberculosis"];

    console.log("Predicciones:", predictionsArray);
    console.log("Predicción:", classes[maxIndex]);

    // Mostrar resultados de predicción
    setPredictionResult("Resultado de la detección: " + classes[maxIndex]);
  }

  async function handlePredictClick() {
    if (imageSrc != undefined) {
      if (imageRef.current) {
        await performInference(imageRef.current);
      } else {
        console.error("La referencia al elemento de imagen es null.");
      }
    } else {
      alert("Falta cargar una imagen");
    }
  }

  // Cambiar modelo

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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-semibold mb-16">Módulo de Detección</h1>
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
            onChange={handleFileChange}
            className="disabled"
          />
          <label htmlFor="fileInput" className="button bg-blue-600 hover:bg-blue-400">
            Cargar imagen
          </label>
          <button
            id="predictButton"
            onClick={handlePredictClick}
            className={`button mt-6 ${btnDisabled}`}
          >
            Realizar Inferencia
          </button>
        </div>
      </div>
      <div id="predictionResult" className="text-2xl mt-6 h-10">
        {predictionResult}
      </div>
    </div>
  );
}
