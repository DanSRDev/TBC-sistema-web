"use client";
import * as tf from "@tensorflow/tfjs";

async function loadModel() {
  console.log("Cargando modelo...");
  //const model = await tf.loadLayersModel("/model/model.json");
  const model = await tf.loadGraphModel("/model/model.json");
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

async function preprocessImageBase(image: HTMLImageElement) {
  const cv: any = (window as any).cv;

  // 1) Leer imagen
  let src = cv.imread(image);
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // 2) Resize 224x224
  let resized = new cv.Mat();
  let dsize = new cv.Size(224, 224);
  cv.resize(gray, resized, dsize, 0, 0, cv.INTER_AREA);

  // ✅ 3) CLAHE debe hacerse en uint8 (NO float)
  let clahe = new cv.CLAHE(4.0, new cv.Size(16, 16));
  let claheResult = new cv.Mat();
  clahe.apply(resized, claheResult);

  // ✅ 4) Ahora SI convertir a float32 y normalizar [0,1]
  claheResult.convertTo(claheResult, cv.CV_32F, 1.0 / 255.0);

  // ✅ 5) Gaussian blur (sigma 0.5)
  let blurred = new cv.Mat();
  let ksize = new cv.Size(3, 3);
  cv.GaussianBlur(claheResult, blurred, ksize, 0.5);

  // ✅ 6) Convertir a Tensor (224,224,1)
  const data = Float32Array.from(blurred.data32F);
  let tensor = tf.tensor3d(data, [224, 224, 1]);

  // ✅ 7) Expandir batch → (1,224,224,1)
  const finalTensor = tensor.expandDims(0);

  // ✅ Liberar memoria
  src.delete();
  gray.delete();
  resized.delete();
  claheResult.delete();
  blurred.delete();
  clahe.delete();

  return finalTensor;
}

async function preprocessImageMobileNetV2(image: HTMLImageElement) {
  const cv: any = (window as any).cv;

  // 1) Leer en escala de grises
  let src = cv.imread(image);
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // 2) Redimensionar a 224x224
  let resized = new cv.Mat();
  let dsize = new cv.Size(224, 224);
  cv.resize(gray, resized, dsize, 0, 0, cv.INTER_AREA);

  // 3) Suavizado gaussiano
  let blurred = new cv.Mat();
  let ksize = new cv.Size(5, 5);
  cv.GaussianBlur(resized, blurred, ksize, 0);

  // 4) CLAHE
  let clahe = new cv.CLAHE(3.0, new cv.Size(16, 16));
  let claheResult = new cv.Mat();
  clahe.apply(blurred, claheResult);

  // 5) Convertir a RGB
  let rgb = new cv.Mat();
  cv.cvtColor(claheResult, rgb, cv.COLOR_GRAY2RGB);

  // 6) Convertir a Tensor float32
  let tensor = tf.tensor3d(rgb.data, [224, 224, 3], "float32");

  // ✅ 7) preprocess_input de MobileNetV2 (ESCALA A [-1, 1])
  // Python: mobilenet_v2.preprocess_input(img)
  tensor = tensor.div(127.5).sub(1.0);

  // 8) Expandir dims para batch → (1, 224, 224, 3)
  const finalTensor = tensor.expandDims(0);

  // ✅ Liberar memoria OpenCV
  src.delete();
  gray.delete();
  resized.delete();
  blurred.delete();
  claheResult.delete();
  rgb.delete();
  clahe.delete();

  return finalTensor;
}

async function preprocessImageResNet(image: HTMLImageElement) {
  const cv: any = (window as any).cv;

  // 1) Leer RGBA → GRAY (igual que Python)
  let src = cv.imread(image);
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // 2) Resize a 224x224 (igual que Python)
  let resized = new cv.Mat();
  cv.resize(gray, resized, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);

  // 3) Gaussian blur
  let blurred = new cv.Mat();
  cv.GaussianBlur(resized, blurred, new cv.Size(5, 5), 0);

  // 4) CLAHE
  let clahe = new cv.CLAHE(4.0, new cv.Size(16, 16));
  let claheResult = new cv.Mat();
  clahe.apply(blurred, claheResult);

  // 5) GRAY → RGB (igual que Python)
  let rgb = new cv.Mat();
  cv.cvtColor(claheResult, rgb, cv.COLOR_GRAY2RGB);

  // 6) RGB → BGR (igual que Python)
  let bgr = new cv.Mat();
  cv.cvtColor(rgb, bgr, cv.COLOR_RGB2BGR);

  // 7) Crear tensor BGR float32
  let data = Float32Array.from(bgr.data);
  let tensor = tf.tensor3d(data, [224, 224, 3], "float32");

  // 8) Aplicar preprocess_input EXACTO (modo caffe)
  // Igual que keras.applications.resnet50.preprocess_input
  const mean = tf.tensor1d([103.939, 116.779, 123.68]); // B, G, R
  
  // resta canal por canal como en Python
  tensor = tf.sub(tensor, mean);

  // 9) Expand dims → [1, 224, 224, 3]
  const finalTensor = tensor.expandDims(0);

  // Liberar memoria OpenCV
  src.delete();
  gray.delete();
  resized.delete();
  blurred.delete();
  claheResult.delete();
  rgb.delete();
  bgr.delete();
  clahe.delete();

  return finalTensor;
}

async function preprocessImageBasePython(image: HTMLImageElement) {
  const cv: any = (window as any).cv;
console.log("inicio funcion");
  // =============== 1) Leer y grayscale ===============
  let src = cv.imread(image);
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // =============== 2) Resize 224×224 ===============
  let resized = new cv.Mat();
  cv.resize(gray, resized, new cv.Size(224, 224), 0, 0, cv.INTER_AREA);

  // Convertir a float32 [0,1] ANTES de CLAHE (como Python)
  let floatImg = new cv.Mat();
  resized.convertTo(floatImg, cv.CV_32F, 1.0 / 255.0);

  // =============== 3) CLAHE estilo scikit-image ===============
  // equalize_adapthist(img, clip_limit=0.04)
  let claheFloat = applyCLAHEFloat(floatImg, 0.04);
console.log("fin clahe");
  // =============== 4) Gaussian filter estilo SciPy ===============
  // gaussian_filter(img, sigma=0.5)
  let blurred = gaussianBlurFloat(claheFloat, 0.5);
console.log("fin blur");
  // =============== 5) Convertir a tensor ===============
  const data = Float32Array.from(blurred.data32F);
  let tensor = tf.tensor3d(data, [224, 224, 1]);
  const finalTensor = tensor.expandDims(0);

  // liberar
  src.delete(); gray.delete(); resized.delete();
  floatImg.delete(); claheFloat.delete(); blurred.delete();
console.log("Modelo cafin funcion");
  return finalTensor;
}

function applyCLAHEFloat(srcFloat: any, clipLimit = 0.04) {
  const cv: any = (window as any).cv;
  const rows = srcFloat.rows;
  const cols = srcFloat.cols;

  let dst = new cv.Mat(rows, cols, cv.CV_32F);

  const tilesX = 8;
  const tilesY = 8;
  const tileW = Math.floor(cols / tilesX);
  const tileH = Math.floor(rows / tilesY);

  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      const x0 = tx * tileW;
      const y0 = ty * tileH;
      const w = (tx === tilesX - 1) ? cols - x0 : tileW;
      const h = (ty === tilesY - 1) ? rows - y0 : tileH;

      // Recorte del tile
      let tile = srcFloat.roi(new cv.Rect(x0, y0, w, h));

      // histograma 256 bins
      let histSize = 256;
      let hist = new Array(histSize).fill(0);

      for (let i = 0; i < tile.rows; i++) {
        for (let j = 0; j < tile.cols; j++) {
          let v = tile.floatAt(i, j);
          let bin = Math.floor(v * 255);
          hist[bin]++;
        }
      }

      // aplicar clip_limit estilo skimage
      let maxCount = clipLimit * tile.rows * tile.cols;
      let excess = 0;
      for (let i = 0; i < histSize; i++) {
        if (hist[i] > maxCount) {
          excess += hist[i] - maxCount;
          hist[i] = maxCount;
        }
      }
      const redist = excess / histSize;
      for (let i = 0; i < histSize; i++) hist[i] += redist;

      // CDF
      let cdf = new Array(histSize);
      cdf[0] = hist[0];
      for (let i = 1; i < histSize; i++) cdf[i] = cdf[i - 1] + hist[i];
      const cdfMin = cdf[0];
      const cdfMax = cdf[histSize - 1];

      // aplicar ecualización al tile
      for (let i = 0; i < tile.rows; i++) {
        for (let j = 0; j < tile.cols; j++) {
          let v = tile.floatAt(i, j);
          let bin = Math.floor(v * 255);
          let eq = (cdf[bin] - cdfMin) / (cdfMax - cdfMin);
          dst.floatPtr(y0 + i, x0 + j)[0] = eq;
        }
      }

      tile.delete();
    }
  }

  return dst;
}

function gaussianBlurFloat(img: any, sigma: number) {
  const cv: any = (window as any).cv;

  // radio ~ 3*sigma
  const radius = Math.ceil(3 * sigma);
  const size = radius * 2 + 1;

  // 1) generar kernel 1D (array)
  let k: number[] = [];
  let s = 0;
  for (let i = -radius; i <= radius; i++) {
    const v = Math.exp(-(i * i) / (2 * sigma * sigma));
    k.push(v);
    s += v;
  }
  k = k.map(v => v / s);

  // 2) convertir a cv.Mat
  const kernelX = cv.matFromArray(1, k.length, cv.CV_32F, k); // 1 x N
  const kernelY = cv.matFromArray(k.length, 1, cv.CV_32F, k); // N x 1

  // 1x1 identity kernel como Mat
  const one = cv.matFromArray(1, 1, cv.CV_32F, [1]);

  // mats temporales
  let tmp = new cv.Mat();
  let dst = new cv.Mat();

  // anchor: punto (-1,-1) -> centro del kernel
  const anchor = new cv.Point(-1, -1);
  const delta = 0;
  const borderType = cv.BORDER_REFLECT;

  // 3) aplicar separable: primera pasada X (kernelX en X, one en Y)
  cv.sepFilter2D(img, tmp, cv.CV_32F, kernelX, one, anchor, delta, borderType);

  // 4) segunda pasada Y (one en X, kernelY en Y)
  cv.sepFilter2D(tmp, dst, cv.CV_32F, one, kernelY, anchor, delta, borderType);

  // limpiar
  tmp.delete();
  kernelX.delete();
  kernelY.delete();
  one.delete();
  //anchor.delete(); // Point es objeto; borrarlo por si acaso (compatibilidad)
  // NOTA: no borrar dst, lo devolvemos

  return dst;
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
        processedImage = await preprocessImageBase(image);
        break;
      case "MobileNet":
        console.log("MobileNet");
        model = await loadModelMv();
        processedImage = await preprocessImageMobileNetV2(image);
        break;
      case "ResNet50":
        console.log("ResNet50");
        model = await loadModelResNet();
        processedImage = await preprocessImageResNet(image);
        break;
      default:
        console.log("using default Basic Model");
        model = await loadModel();
        processedImage = await preprocessImageBase(image);
        break;
    }

  // Realiza la inferencia con el modelo.
  const predictions = await (
    model.predict(processedImage) as tf.Tensor
  ).dataSync();
  console.log("processedImage shape:", processedImage.shape);
  const predictionsArray = Array.from(predictions);

  // Encuentra la clase con la probabilidad más alta
  const maxIndex = predictions.indexOf(Math.max.apply(null, predictionsArray));

  // Definición de clases
  const classes = ["Normal", "Tuberculosis"];

  console.log("Predicciones:", predictionsArray);
  console.log("Predicción:", classes[maxIndex], " Porcentaje:", Math.floor(predictionsArray[maxIndex] * 100) / 100);

  // Devolver resultado
  const result = `${classes[maxIndex]} (${Math.floor(predictionsArray[maxIndex] * 100)}%)`;

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
