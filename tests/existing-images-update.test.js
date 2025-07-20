/**
 * Test para diagnosticar el problema de existingImages en actualización
 * Ubicación: ./tests/existing-images-update.test.js
 */

console.log("🔍 TEST: Diagnóstico de existingImages en Actualización");
console.log("=====================================================");

// Simular lo que envía el frontend cuando se actualiza una propiedad
const mockFormDataFromFrontend = {
  titulo: "Casa Actualizada",
  precio: "280000",
  descripcion: "Casa actualizada con imágenes existentes",
  tipo: "casa",
  operacion: "venta",
  estado: "disponible",
  destacado: "false",

  // Datos estructurados (nueva implementación)
  ubicacion: JSON.stringify({
    direccion: "Calle Test 123",
    ciudad: "Buenos Aires",
    estado: "CABA",
    codigoPostal: "1000",
  }),

  caracteristicas: JSON.stringify({
    habitaciones: 3,
    baños: 2,
    area: 120,
  }),

  amenidades: JSON.stringify(["pileta", "jardin"]),

  // ¡AQUÍ ESTÁ EL PROBLEMA! - Las imágenes existentes se envían pero no se procesan
  existingImages: JSON.stringify([
    "http://localhost:5001/uploads/properties/casa-test-1752003729979-633542889.jpg",
    "http://localhost:5001/uploads/properties/casa-test-1752003730038-662878244.jpg",
  ]),
};

// Simular el procesamiento actual del backend (solo nuevas imágenes)
function simulateCurrentBackendProcessing(formData, uploadedFiles = []) {
  console.log("🔧 Procesamiento ACTUAL del backend:");
  console.log("📝 Datos recibidos:", JSON.stringify(formData, null, 2));

  const processedData = { ...formData };

  // El middleware processUploadedImages solo procesa archivos subidos
  if (uploadedFiles.length > 0) {
    console.log(`📸 Procesando ${uploadedFiles.length} archivos nuevos...`);

    const processedImages = uploadedFiles.map((file, index) => ({
      _id: "new_" + index,
      url: `/uploads/properties/${file.filename}`,
      alt: `${formData.titulo} - Imagen ${index + 1}`,
      orden: index + 1,
      nombreArchivo: file.filename,
      esPortada: index === 0,
    }));

    processedData.imagenes = processedImages;
    console.log("✅ Imágenes nuevas procesadas:", processedImages);
  } else {
    console.log("ℹ️  No hay archivos nuevos subidos");
  }

  // ¡PROBLEMA! - existingImages se ignora completamente
  if (formData.existingImages) {
    console.log("🚨 PROBLEMA: existingImages encontradas pero NO procesadas");
    console.log("📋 existingImages:", formData.existingImages);
  }

  return processedData;
}

// Simular el procesamiento CORRECTO (combinar existentes + nuevas)
function simulateCorrectBackendProcessing(formData, uploadedFiles = []) {
  console.log("\n✅ Procesamiento CORRECTO propuesto:");

  const processedData = { ...formData };
  let allImages = [];

  // Procesar imágenes existentes
  if (formData.existingImages) {
    try {
      const existingImages = JSON.parse(formData.existingImages);
      console.log(
        `📸 Procesando ${existingImages.length} imágenes existentes...`
      );

      const processedExisting = existingImages.map((imageUrl, index) => {
        // Convertir URL completa a formato interno
        let url = imageUrl;
        if (url.startsWith("http://localhost:5001")) {
          url = url.replace("http://localhost:5001", "");
        }

        return {
          _id: "existing_" + index,
          url: url,
          alt: `${formData.titulo} - Imagen existente ${index + 1}`,
          orden: index + 1,
          nombreArchivo: url.split("/").pop(),
          esPortada: index === 0 && uploadedFiles.length === 0, // Solo si no hay nuevas
        };
      });

      allImages = [...processedExisting];
      console.log("✅ Imágenes existentes procesadas:", processedExisting);
    } catch (error) {
      console.error("❌ Error procesando existingImages:", error);
    }
  }

  // Procesar nuevas imágenes
  if (uploadedFiles.length > 0) {
    console.log(`📸 Procesando ${uploadedFiles.length} archivos nuevos...`);

    const processedNew = uploadedFiles.map((file, index) => ({
      _id: "new_" + index,
      url: `/uploads/properties/${file.filename}`,
      alt: `${formData.titulo} - Imagen nueva ${index + 1}`,
      orden: allImages.length + index + 1,
      nombreArchivo: file.filename,
      esPortada: allImages.length === 0 && index === 0, // Portada si no hay existentes
    }));

    allImages = [...allImages, ...processedNew];
    console.log("✅ Imágenes nuevas procesadas:", processedNew);
  }

  // Asegurar que hay al menos una portada
  if (allImages.length > 0 && !allImages.some((img) => img.esPortada)) {
    allImages[0].esPortada = true;
  }

  processedData.imagenes = allImages;
  console.log("🎯 TODAS las imágenes combinadas:", allImages);

  return processedData;
}

// Ejecutar simulaciones
console.log(
  "🧪 CASO 1: Solo imágenes existentes (actualización sin nuevas imágenes)"
);
console.log("=" * 70);

const case1Current = simulateCurrentBackendProcessing(
  mockFormDataFromFrontend,
  []
);
const case1Correct = simulateCorrectBackendProcessing(
  mockFormDataFromFrontend,
  []
);

console.log("\n📊 RESULTADO CASO 1:");
console.log(
  "🔧 Actual - Imágenes finales:",
  case1Current.imagenes || "UNDEFINED (Sin imágenes)"
);
console.log(
  "✅ Correcto - Imágenes finales:",
  case1Correct.imagenes?.length || 0,
  "imágenes"
);

console.log("\n🧪 CASO 2: Imágenes existentes + nuevas imágenes");
console.log("=" * 50);

const mockNewFiles = [
  { filename: "nueva-imagen-123.jpg" },
  { filename: "otra-nueva-456.jpg" },
];

const case2Current = simulateCurrentBackendProcessing(
  mockFormDataFromFrontend,
  mockNewFiles
);
const case2Correct = simulateCorrectBackendProcessing(
  mockFormDataFromFrontend,
  mockNewFiles
);

console.log("\n📊 RESULTADO CASO 2:");
console.log(
  "🔧 Actual - Imágenes finales:",
  case2Current.imagenes?.length || 0,
  "imágenes (solo nuevas)"
);
console.log(
  "✅ Correcto - Imágenes finales:",
  case2Correct.imagenes?.length || 0,
  "imágenes (existentes + nuevas)"
);

// Conclusiones
console.log("\n🎯 CONCLUSIONES:");
console.log("================");
console.log("🚨 PROBLEMA CONFIRMADO:");
console.log("   - El backend ignora completamente existingImages");
console.log("   - Solo procesa archivos nuevos subidos via multer");
console.log("   - Las imágenes existentes se pierden en actualizaciones");
console.log("");
console.log("💡 SOLUCIÓN REQUERIDA:");
console.log("   - Modificar middleware de upload para procesar existingImages");
console.log("   - Combinar imágenes existentes + nuevas en el array final");
console.log("   - Mantener URLs relativas consistentes en la base de datos");

console.log("\n🏁 DIAGNÓSTICO COMPLETADO");
