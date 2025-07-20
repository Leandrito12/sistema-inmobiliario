/**
 * Test para diagnosticar problema de imágenes en dashboard tras actualización
 * Ubicación: ./tests/dashboard-images-after-update.test.js
 */

console.log("🔍 TEST: Diagnóstico de Imágenes en Dashboard tras Actualización");
console.log("================================================================");

// Simular respuesta del backend cuando se obtiene la lista de propiedades (dashboard)
const mockDashboardResponse = {
  data: {
    properties: [
      {
        _id: "507f1f77bcf86cd799439011",
        titulo: "Casa Actualizada",
        precio: 280000,
        ubicacion: {
          direccion: "Calle Test 123",
          ciudad: "Buenos Aires",
        },
        caracteristicas: {
          habitaciones: 3,
          baños: 2,
          area: 120,
        },
        // Caso 1: URLs relativas (como podrían llegar desde el backend)
        imagenes: [
          {
            _id: "507f1f77bcf86cd799439012",
            url: "/uploads/properties/casa-test-1752003729979-633542889.jpg",
            alt: "Imagen 1",
            orden: 1,
            esPortada: true,
          },
        ],
      },
      {
        _id: "507f1f77bcf86cd799439014",
        titulo: "Apartamento Sin Imágenes",
        precio: 150000,
        ubicacion: {
          direccion: "Av. Corrientes 1234",
          ciudad: "Buenos Aires",
        },
        caracteristicas: {
          habitaciones: 2,
          baños: 1,
          area: 60,
        },
        // Caso 2: Array vacío
        imagenes: [],
      },
      {
        _id: "507f1f77bcf86cd799439015",
        titulo: "Casa con URLs Completas",
        precio: 320000,
        ubicacion: {
          direccion: "Calle Falsa 456",
          ciudad: "Buenos Aires",
        },
        caracteristicas: {
          habitaciones: 4,
          baños: 3,
          area: 180,
        },
        // Caso 3: URLs completas (como podrían quedar tras actualización)
        imagenes: [
          {
            _id: "507f1f77bcf86cd799439016",
            url: "http://localhost:5001/uploads/properties/casa-completa-123.jpg",
            alt: "Imagen completa",
            orden: 1,
            esPortada: true,
          },
        ],
      },
    ],
  },
};

// Simular la función getImageUrl del AdminDashboard (versión actual)
function getImageUrlDashboard(property) {
  if (
    property.imagenes &&
    property.imagenes.length > 0 &&
    property.imagenes[0].url
  ) {
    let url = property.imagenes[0].url;

    // Si la URL ya es completa (comienza con http), extraer solo la parte de uploads
    if (url.startsWith("http")) {
      const uploadIndex = url.indexOf("/uploads");
      if (uploadIndex !== -1) {
        url = url.substring(uploadIndex);
      }
    }

    // Corregir doble slash si existe
    if (url.includes("//uploads")) {
      url = url.replace("//uploads", "/uploads");
    }

    // Asegurar que la URL apunte al puerto correcto del backend (5001)
    const fullUrl = `http://localhost:5001${url}`;
    return fullUrl;
  }

  return null; // ← ESTO CAUSA "Sin imagen disponible"
}

// Función mejorada propuesta
function getImageUrlDashboardImproved(property) {
  // Verificar si hay imágenes
  if (
    !property.imagenes ||
    !Array.isArray(property.imagenes) ||
    property.imagenes.length === 0
  ) {
    return null;
  }

  // Buscar imagen de portada o tomar la primera
  const portadaImage =
    property.imagenes.find((img) => img.esPortada) || property.imagenes[0];

  if (!portadaImage || !portadaImage.url) {
    return null;
  }

  let url = portadaImage.url;

  // Si la URL ya es completa (comienza con http), extraer solo la parte de uploads
  if (url.startsWith("http")) {
    const uploadIndex = url.indexOf("/uploads");
    if (uploadIndex !== -1) {
      url = url.substring(uploadIndex);
    }
  }

  // Corregir doble slash si existe
  if (url.includes("//uploads")) {
    url = url.replace("//uploads", "/uploads");
  }

  // Asegurar que la URL apunte al puerto correcto del backend (5001)
  const fullUrl = `http://localhost:5001${url}`;
  return fullUrl;
}

console.log("🧪 Ejecutando diagnóstico...\n");

// Probar cada propiedad
mockDashboardResponse.data.properties.forEach((property, index) => {
  console.log(`🏠 PROPIEDAD ${index + 1}: ${property.titulo}`);
  console.log(`📋 Imágenes: ${JSON.stringify(property.imagenes, null, 2)}`);

  const currentResult = getImageUrlDashboard(property);
  const improvedResult = getImageUrlDashboardImproved(property);

  console.log(
    `🔧 Función ACTUAL: ${currentResult || "❌ NULL (Sin imagen disponible)"}`
  );
  console.log(
    `✅ Función MEJORADA: ${
      improvedResult || "❌ NULL (Sin imagen disponible)"
    }`
  );

  // Verificar si debería mostrar imagen
  const hasImages = property.imagenes && property.imagenes.length > 0;
  const shouldShowImage = hasImages && property.imagenes.some((img) => img.url);

  if (shouldShowImage && !currentResult) {
    console.log(
      "🚨 PROBLEMA: Debería mostrar imagen pero la función actual devuelve NULL"
    );
  } else if (shouldShowImage && currentResult) {
    console.log("✅ OK: Función actual funciona correctamente");
  } else if (!shouldShowImage) {
    console.log("ℹ️  NORMAL: No hay imágenes para mostrar");
  }

  console.log("─".repeat(50));
});

// Simular caso específico: después de actualización
console.log("\n🔄 SIMULANDO CASO ESPECÍFICO: Después de actualización");
console.log("======================================================");

// Simular cómo podría quedar la propiedad después de actualizar
const propertyAfterUpdate = {
  _id: "507f1f77bcf86cd799439011",
  titulo: "Casa Actualizada Via Form",
  imagenes: [
    {
      _id: "507f1f77bcf86cd799439012",
      url: "http://localhost:5001/uploads/properties/casa-test-1752003729979-633542889.jpg", // URL completa
      alt: "Imagen 1",
      orden: 1,
      esPortada: true,
    },
  ],
};

console.log("📝 Propiedad después de actualización:");
console.log(JSON.stringify(propertyAfterUpdate.imagenes, null, 2));

const afterUpdateCurrent = getImageUrlDashboard(propertyAfterUpdate);
const afterUpdateImproved = getImageUrlDashboardImproved(propertyAfterUpdate);

console.log(`\n🔧 Función ACTUAL: ${afterUpdateCurrent || "❌ NULL"}`);
console.log(`✅ Función MEJORADA: ${afterUpdateImproved || "❌ NULL"}`);

// Resultado final
console.log("\n🎯 CONCLUSIONES:");
console.log("================");

if (afterUpdateCurrent) {
  console.log("✅ La función actual del dashboard SÍ debería funcionar");
  console.log("🔍 El problema podría estar en:");
  console.log("   1. Cómo el backend guarda las URLs tras actualización");
  console.log("   2. Formato de respuesta diferente del API");
  console.log("   3. Algún error en el flujo de actualización");
} else {
  console.log("❌ La función actual del dashboard tiene problemas");
  console.log("💡 Se requiere actualizar la función getImageUrl del dashboard");
}

console.log("\n🚀 PRÓXIMOS PASOS:");
console.log(
  "1. Verificar qué URLs llegan realmente al dashboard tras actualización"
);
console.log(
  "2. Comparar con las URLs que funcionan en el formulario de edición"
);
console.log("3. Ajustar la función getImageUrl del dashboard si es necesario");

console.log("\n🏁 DIAGNÓSTICO COMPLETADO");
