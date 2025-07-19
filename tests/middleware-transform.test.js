/**
 * Test de ejemplo para verificar el middleware de transformación
 * Ubicación: ./tests/middleware-transform.test.js
 * 
 * Este test verifica que el middleware procesa correctamente
 * los datos enviados desde el frontend en formato JSON
 */

console.log('🧪 TEST: Middleware de Transformación');
console.log('=====================================');

// Simular datos como los envía el frontend ahora
const mockRequestBody = {
  titulo: 'Casa de Prueba',
  precio: '350000',
  descripcion: 'Casa con nueva estructura de datos',
  tipo: 'casa',
  operacion: 'venta',
  estado: 'disponible',
  destacado: 'false',
  
  // Datos en formato JSON (como los envía el nuevo frontend)
  ubicacion: JSON.stringify({
    direccion: 'Calle Test 123',
    ciudad: 'Buenos Aires',
    estado: 'CABA',
    codigoPostal: '1000'
  }),
  
  caracteristicas: JSON.stringify({
    habitaciones: 3,
    baños: 2,
    area: 120
  }),
  
  amenidades: JSON.stringify(['pileta', 'jardin'])
};

// Simular el procesamiento del middleware
function simulateMiddleware(body) {
  console.log('📝 Datos de entrada:', JSON.stringify(body, null, 2));
  
  const processed = { ...body };
  
  // Parsear ubicación
  if (processed.ubicacion && typeof processed.ubicacion === "string") {
    try {
      processed.ubicacion = JSON.parse(processed.ubicacion);
      console.log("✅ Ubicación parseada correctamente");
    } catch (e) {
      console.error("❌ Error parseando ubicación:", e);
      processed.ubicacion = {};
    }
  }

  // Parsear características
  if (processed.caracteristicas && typeof processed.caracteristicas === "string") {
    try {
      processed.caracteristicas = JSON.parse(processed.caracteristicas);
      console.log("✅ Características parseadas correctamente");
    } catch (e) {
      console.error("❌ Error parseando características:", e);
      processed.caracteristicas = {};
    }
  }

  // Parsear amenidades
  if (processed.amenidades && typeof processed.amenidades === "string") {
    try {
      processed.amenidades = JSON.parse(processed.amenidades);
      console.log("✅ Amenidades parseadas correctamente");
    } catch (e) {
      processed.amenidades = [];
    }
  }

  // Convertir tipos
  if (processed.precio) {
    processed.precio = parseFloat(processed.precio);
  }

  if (processed.destacado) {
    processed.destacado = processed.destacado === "true";
  }

  // Agregar fechas
  if (!processed.fechaPublicacion) {
    processed.fechaPublicacion = new Date();
  }
  processed.fechaActualizacion = new Date();

  return processed;
}

// Ejecutar test
try {
  const result = simulateMiddleware(mockRequestBody);
  
  console.log('\n📊 Resultado del procesamiento:');
  console.log(JSON.stringify(result, null, 2));
  
  // Verificaciones
  const tests = [
    {
      name: 'Campo baños es número',
      condition: typeof result.caracteristicas?.baños === 'number',
      expected: 2,
      actual: result.caracteristicas?.baños
    },
    {
      name: 'Ubicación es objeto',
      condition: typeof result.ubicacion === 'object' && result.ubicacion !== null,
      expected: 'object',
      actual: typeof result.ubicacion
    },
    {
      name: 'Precio es número',
      condition: typeof result.precio === 'number',
      expected: 350000,
      actual: result.precio
    },
    {
      name: 'Destacado es boolean',
      condition: typeof result.destacado === 'boolean',
      expected: false,
      actual: result.destacado
    }
  ];

  console.log('\n🔍 Verificaciones:');
  let allPassed = true;
  
  tests.forEach((test, index) => {
    const passed = test.condition && test.actual === test.expected;
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${test.name}: ${test.actual} (esperado: ${test.expected})`);
    if (!passed) allPassed = false;
  });

  if (allPassed) {
    console.log('\n🎉 TODOS LOS TESTS PASARON EXITOSAMENTE');
    process.exit(0);
  } else {
    console.log('\n💥 ALGUNOS TESTS FALLARON');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Error en el test:', error);
  process.exit(1);
}
