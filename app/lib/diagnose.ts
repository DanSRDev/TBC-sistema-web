import * as tf from "@tensorflow/tfjs";

async function loadModel() {
  console.log("Cargando modelo...");
  const model = await tf.loadLayersModel("/model/model.json");
  console.log("Modelo cargado...");
  return model;
}

async function loadModelMv() {
  console.log("Cargando modelo...");
  const model = await tf.loadGraphModel("/modelmv/model.json");
  console.log("Modelo cargado...");
  return model;
}

async function loadModelResNet() {
  console.log("Cargando modelo...");
  const model = await tf.loadGraphModel("/modelresnet/model.json");
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

function preprocessImageGraph(image: HTMLImageElement) {
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

// Realizar diagnostico

async function performInference(
  image: HTMLImageElement,
  selectedModel: string
) {
  let model;
  let processedImage;

  switch (selectedModel) {
    case "Basic Model":
      console.log("Basic Model");
      model = await loadModel();
      processedImage = preprocessImage(image);
      break;
    case "MobileNet":
      console.log("MobileNet");
      model = await loadModelMv();
      processedImage = preprocessImageGraph(image);
      break;
    case "ResNet50":
      console.log("ResNet50");
      model = await loadModelResNet();
      processedImage = preprocessImageGraph(image);
      break;
    default:
      console.log("using default Basic Model");
      model = await loadModel();
      processedImage = preprocessImage(image);
      break;
  }

  // Realiza la inferencia con el modelo.
  const predictions = await (
    model.predict(processedImage) as tf.Tensor
  ).dataSync();
  const predictionsArray = Array.from(predictions);

  // Encuentra la clase con la probabilidad más alta
  const maxIndex = predictions.indexOf(Math.max.apply(null, predictionsArray));

  // Definición de clases
  const classes = ["Normal", "Tuberculosis"];

  console.log("Predicciones:", predictionsArray);
  console.log("Predicción:", classes[maxIndex]);

  // Devolver resultado
  const result = classes[maxIndex];

  return result;
}

export async function handlePredictClick(
  imageSrc: string,
  imageRef: React.MutableRefObject<null>,
  selectedModel: string
) {
  if (imageSrc != undefined) {
    if (imageRef.current) {
      const result = await performInference(imageRef.current, selectedModel);
      return result;
    } else {
      console.error("La referencia al elemento de imagen es null.");
    }
  } else {
    alert("Falta cargar una imagen");
  }
}
