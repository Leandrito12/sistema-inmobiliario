import { Request, Response, NextFunction } from "express";

/**
 * Middleware para procesar y validar los datos de propiedad
 * El frontend ahora envía los datos en la estructura correcta del backend
 */
export const transformPropertyData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🚀 MIDDLEWARE EJECUTÁNDOSE - transformPropertyData");
  console.log("📝 Método:", req.method);
  console.log("📝 URL:", req.url);
  console.log("📝 Datos recibidos:", JSON.stringify(req.body, null, 2));

  // Parsear ubicación si viene como string JSON
  if (req.body.ubicacion && typeof req.body.ubicacion === "string") {
    try {
      req.body.ubicacion = JSON.parse(req.body.ubicacion);
      console.log("🔄 Ubicación parseada:", req.body.ubicacion);
    } catch (e) {
      console.error("❌ Error parseando ubicación:", e);
      req.body.ubicacion = {};
    }
  }

  // Parsear características si viene como string JSON
  if (
    req.body.caracteristicas &&
    typeof req.body.caracteristicas === "string"
  ) {
    try {
      req.body.caracteristicas = JSON.parse(req.body.caracteristicas);
      console.log("🔄 Características parseadas:", req.body.caracteristicas);
    } catch (e) {
      console.error("❌ Error parseando características:", e);
      req.body.caracteristicas = {};
    }
  }

  // Convertir precio a número
  if (req.body.precio) {
    req.body.precio = parseFloat(req.body.precio);
  }

  // Parsear amenidades si viene como string JSON
  if (req.body.amenidades && typeof req.body.amenidades === "string") {
    try {
      req.body.amenidades = JSON.parse(req.body.amenidades);
    } catch (e) {
      req.body.amenidades = [];
    }
  }

  // Asegurar que amenidades es un array
  if (!Array.isArray(req.body.amenidades)) {
    req.body.amenidades = [];
  }

  // Convertir campos booleanos
  if (req.body.destacado) {
    req.body.destacado = req.body.destacado === "true";
  }

  // Establecer fechas
  if (!req.body.fechaPublicacion) {
    req.body.fechaPublicacion = new Date();
  }
  req.body.fechaActualizacion = new Date();

  console.log(
    "🔄 Datos finales procesados:",
    JSON.stringify(req.body, null, 2)
  );
  console.log("✅ MIDDLEWARE TERMINADO - transformPropertyData");
  next();
};
