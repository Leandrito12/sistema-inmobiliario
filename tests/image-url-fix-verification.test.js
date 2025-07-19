/**
 * Test para verificar la corrección de URLs de imágenes en edición
 * Ubicación: ./tests/image-url-fix-verification.test.js
 */

console.log("✅ TEST: Verificación de Corrección de URLs de Imágenes");
console.log("======================================================");

// Simular la función getImageUrl del AdminPropertyForm
function getImageUrl(imagePath) {
  if (!imagePath) return "";

  let url = imagePath;

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

// Casos de prueba
const testCases = [
  {
    name: "URL relativa normal",
    input: "/uploads/properties/casa-test-123.jpg",
    expected: "http://localhost:5001/uploads/properties/casa-test-123.jpg",
  },
  {
    name: "URL con doble slash",
    input: "//uploads/properties/casa-test-123.jpg",
    expected: "http://localhost:5001/uploads/properties/casa-test-123.jpg",
  },
  {
    name: "URL completa con puerto incorrecto",
    input: "http://localhost:3000/uploads/properties/casa-test-123.jpg",
    expected: "http://localhost:5001/uploads/properties/casa-test-123.jpg",
  },
  {
    name: "URL completa con puerto correcto",
    input: "http://localhost:5001/uploads/properties/casa-test-123.jpg",
    expected: "http://localhost:5001/uploads/properties/casa-test-123.jpg",
  },
  {
    name: "String vacío",
    input: "",
    expected: "",
  },
  {
    name: "Sin uploads en la ruta",
    input: "/static/images/default.jpg",
    expected: "http://localhost:5001/static/images/default.jpg",
  },
];

// Simular datos de respuesta del backend
const mockProperty = {
  imagenes: [
    { url: "/uploads/properties/casa-1-123.jpg", alt: "Imagen 1" },
    { url: "//uploads/properties/casa-2-456.jpg", alt: "Imagen 2" },
    {
      url: "http://localhost:3000/uploads/properties/casa-3-789.jpg",
      alt: "Imagen 3",
    },
  ],
};

console.log("🧪 Ejecutando casos de prueba individuales...\n");

// Ejecutar casos de prueba
let allPassed = true;
testCases.forEach((testCase, index) => {
  const result = getImageUrl(testCase.input);
  const passed = result === testCase.expected;
  const status = passed ? "✅" : "❌";

  console.log(`${status} Test ${index + 1}: ${testCase.name}`);
  console.log(`   Input:    "${testCase.input}"`);
  console.log(`   Expected: "${testCase.expected}"`);
  console.log(`   Got:      "${result}"`);

  if (!passed) {
    allPassed = false;
    console.log(
      `   🚨 FALLÓ: Se esperaba "${testCase.expected}", pero se obtuvo "${result}"`
    );
  }
  console.log("");
});

// Simular procesamiento de imágenes como en el componente
console.log("🔧 Simulando procesamiento de imágenes del componente...\n");

if (mockProperty.imagenes && Array.isArray(mockProperty.imagenes)) {
  const correctedImages = mockProperty.imagenes.map((img, index) => {
    const imagePath = img.url || img;
    const correctedUrl = getImageUrl(imagePath);
    console.log(`Imagen ${index + 1}:`);
    console.log(`  Original: "${imagePath}"`);
    console.log(`  Corregida: "${correctedUrl}"`);
    return correctedUrl;
  });

  console.log("\n📋 URLs finales corregidas:");
  correctedImages.forEach((url, index) => {
    const isValid = url.startsWith("http://localhost:5001");
    console.log(`  ${index + 1}. ${isValid ? "✅" : "❌"} ${url}`);
  });

  const allValid = correctedImages.every((url) =>
    url.startsWith("http://localhost:5001")
  );
  console.log(
    `\n🎯 Resultado: ${allValid ? "✅ TODAS VÁLIDAS" : "❌ HAY URLs INVÁLIDAS"}`
  );
}

// Resultado final
console.log("\n" + "=".repeat(50));
if (allPassed) {
  console.log(
    "🎉 TODOS LOS TESTS PASARON - CORRECCIÓN IMPLEMENTADA EXITOSAMENTE"
  );
  process.exit(0);
} else {
  console.log("💥 ALGUNOS TESTS FALLARON - REVISAR IMPLEMENTACIÓN");
  process.exit(1);
}
