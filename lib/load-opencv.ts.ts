let loadingPromise: Promise<void> | null = null;

export function loadOpenCV(): Promise<void> {
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;

    // ✅ Ya está cargado completamente
    if ((window as any).cv && (window as any).cv.Mat) {
      console.log("✅ OpenCV ya estaba listo");
      resolve();
      return;
    }

    // ✅ Ya existe el <script>
    const existingScript = document.querySelector(
      'script[src="/opencv/opencv.js"]'
    );

    if (existingScript) {
      console.log("⏳ Script ya existe, esperando inicialización...");
      (window as any).cv.onRuntimeInitialized = () => {
        console.log("✅ OpenCV inicializado (reuse)");
        resolve();
      };
      return;
    }

    console.log("🚀 Insertando script OpenCV...");

    const script = document.createElement("script");
    script.src = "/opencv/opencv.js";
    script.async = true;

    script.onload = () => {
      (window as any).cv.onRuntimeInitialized = () => {
        console.log("✅ OpenCV inicializado (first load)");
        resolve();
      };
    };

    script.onerror = () => reject("❌ Error cargando OpenCV");

    document.body.appendChild(script);
  });

  return loadingPromise;
}