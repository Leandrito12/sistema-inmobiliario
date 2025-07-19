/**
 * Test para diagnosticar el problema de imágenes en edición
 * Ubicación: ./tests/image-url-edit.test.js
 */

console.log("🔍 TEST: Diagnóstico de URLs de Imágenes en Edición");
console.log("===================================================");

// Simular respuesta del backend cuando se obtiene una propiedad para editar
const mockPropertyResponse = {
  data: {
    property: {
      _id: "507f1f77bcf86cd799439011",
      titulo: "Casa de Prueba",
      precio: 250000,
      descripcion: "Casa para diagnosticar problema de imágenes",
      ubicacion: {
        direccion: "Calle Test 123",
        ciudad: "Buenos Aires",
        estado: "CABA",
        codigoPostal: "1000",
      },
      caracteristicas: {
        habitaciones: 3,
        baños: 2,
        area: 120,
      },
      imagenes: [
        {
          _id: "507f1f77bcf86cd799439012",
          url: "/uploads/properties/casa-test-1752003729979-633542889.jpg",
          alt: "Imagen 1",
          orden: 1,
          nombreArchivo: "casa-test-1752003729979-633542889.jpg",
          esPortada: true,
        },
        {
          _id: "507f1f77bcf86cd799439013",
          url: "/uploads/properties/casa-test-1752003730038-662878244.jpg",
          alt: "Imagen 2",
          orden: 2,
          nombreArchivo: "casa-test-1752003730038-662878244.jpg",
          esPortada: false,
        },
      ],
    },
  },
};

console.log("📋 Datos simulados del backend:");
console.log(
  JSON.stringify(mockPropertyResponse.data.property.imagenes, null, 2)
);

// Simular cómo el frontend actual procesa las imágenes
function processImagesCurrently(property) {
  console.log("\n🔧 Procesamiento ACTUAL del frontend:");

  if (property.imagenes && Array.isArray(property.imagenes)) {
    const processedImages = property.imagenes.map((img) => img.url || img);
    console.log("URLs procesadas:", processedImages);
    return processedImages;
  }

  return [];
}

// Función para construir URL correcta de imagen (como debe ser)
function getCorrectImageUrl(imagePath) {
  const baseUrl = "http://localhost:5001";

  // Si ya tiene el dominio completo, devolverla tal como está
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Si empieza con /, agregarle solo el base URL
  if (imagePath.startsWith("/")) {
    return `${baseUrl}${imagePath}`;
  }

  // Si no tiene /, agregar /uploads/properties/ y el base URL
  return `${baseUrl}/uploads/properties/${imagePath}`;
}

// Simular procesamiento CORRECTO
function processImagesCorrectly(property) {
  console.log("\n✅ Procesamiento CORRECTO propuesto:");

  if (property.imagenes && Array.isArray(property.imagenes)) {
    const processedImages = property.imagenes.map((img) => {
      const imagePath = img.url || img;
      const correctUrl = getCorrectImageUrl(imagePath);
      console.log(`  "${imagePath}" → "${correctUrl}"`);
      return correctUrl;
    });
    return processedImages;
  }

  return [];
}

// Ejecutar diagnóstico
try {
  const property = mockPropertyResponse.data.property;

  console.log("\n🚨 PROBLEMA IDENTIFICADO:");

  // Procesar con método actual
  const currentUrls = processImagesCurrently(property);
  console.log("\n❌ URLs actuales (probablemente rotas):");
  currentUrls.forEach((url) => console.log(`  - ${url}`));

  // Procesar con método correcto
  const correctUrls = processImagesCorrectly(property);
  console.log("\n✅ URLs corregidas:");
  correctUrls.forEach((url) => console.log(`  - ${url}`));

  // Verificar si las URLs son válidas
  console.log("\n🔍 Análisis de URLs:");

  currentUrls.forEach((url, index) => {
    const isValid = url.startsWith("http://localhost:5001");
    console.log(
      `  Imagen ${index + 1}: ${isValid ? "✅ VÁLIDA" : "❌ INVÁLIDA"} - ${url}`
    );
  });

  console.log("\n💡 SOLUCIÓN PROPUESTA:");
  console.log("1. Crear función getImageUrl() en el frontend");
  console.log("2. Aplicar esta función al mostrar imágenes existentes");
  console.log("3. Asegurar que las URLs siempre incluyan el dominio completo");

  console.log("\n🎯 RESULTADO:");
  const allValid = correctUrls.every((url) =>
    url.startsWith("http://localhost:5001")
  );
  if (allValid) {
    console.log("✅ Todas las URLs corregidas son válidas");
  } else {
    console.log("❌ Aún hay URLs inválidas");
  }
} catch (error) {
  console.error("❌ Error en el diagnóstico:", error);
  process.exit(1);
}

console.log("\n🏁 DIAGNÓSTICO COMPLETADO");
