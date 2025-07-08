import { Request, Response, NextFunction } from "express";

/**
 * Middleware para transformar los datos del formulario plano
 * en la estructura anidada esperada por el modelo Property
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

  // Construir el objeto de ubicación si los campos existen
  if (
    req.body["ubicacion.direccion"] ||
    req.body["ubicacion.ciudad"] ||
    req.body["ubicacion.estado"] ||
    req.body["ubicacion.codigoPostal"]
  ) {
    req.body.ubicacion = {
      direccion: req.body["ubicacion.direccion"] || "",
      ciudad: req.body["ubicacion.ciudad"] || "",
      estado: req.body["ubicacion.estado"] || "",
      codigoPostal: req.body["ubicacion.codigoPostal"] || "",
    };

    // Limpiar los campos planos
    delete req.body["ubicacion.direccion"];
    delete req.body["ubicacion.ciudad"];
    delete req.body["ubicacion.estado"];
    delete req.body["ubicacion.codigoPostal"];
  }

  // Construir el objeto de características si los campos existen
  console.log("🔍 VERIFICANDO CAMPOS DE CARACTERÍSTICAS...");
  console.log(
    "🔍 caracteristicas.habitaciones:",
    req.body["caracteristicas.habitaciones"]
  );
  console.log("🔍 caracteristicas.baños:", req.body["caracteristicas.baños"]);
  console.log("🔍 caracteristicas.area:", req.body["caracteristicas.area"]);

  if (
    req.body["caracteristicas.habitaciones"] !== undefined ||
    req.body["caracteristicas.baños"] !== undefined ||
    req.body["caracteristicas.area"] !== undefined ||
    req.body["caracteristicas.estacionamientos"] !== undefined
  ) {
    console.log("🔍 Campos de características encontrados:", {
      habitaciones: req.body["caracteristicas.habitaciones"],
      baños: req.body["caracteristicas.baños"],
      area: req.body["caracteristicas.area"],
      estacionamientos: req.body["caracteristicas.estacionamientos"],
    });

    // Preservar características existentes si están presentes
    const existingCaracteristicas = req.body.caracteristicas || {};

    // Construir el objeto de características manteniendo todos los campos
    const newCaracteristicas = {
      ...existingCaracteristicas,
    };

    // Actualizar solo los campos que vienen en el request
    if (req.body["caracteristicas.habitaciones"] !== undefined) {
      newCaracteristicas.habitaciones =
        parseInt(req.body["caracteristicas.habitaciones"]) || 0;
    }

    if (req.body["caracteristicas.baños"] !== undefined) {
      newCaracteristicas.baños =
        parseInt(req.body["caracteristicas.baños"]) || 0;
    }

    if (req.body["caracteristicas.area"] !== undefined) {
      newCaracteristicas.area =
        parseFloat(req.body["caracteristicas.area"]) || 0;
    }

    if (req.body["caracteristicas.estacionamientos"] !== undefined) {
      newCaracteristicas.estacionamientos =
        parseInt(req.body["caracteristicas.estacionamientos"]) || 0;
    }

    req.body.caracteristicas = newCaracteristicas;

    console.log(
      "🔄 Objeto caracteristicas construido:",
      req.body.caracteristicas
    );

    // Limpiar los campos planos
    delete req.body["caracteristicas.habitaciones"];
    delete req.body["caracteristicas.baños"];
    delete req.body["caracteristicas.area"];
    delete req.body["caracteristicas.estacionamientos"];
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

  console.log("🔄 Datos transformados:", JSON.stringify(req.body, null, 2));

  console.log("✅ MIDDLEWARE TERMINADO - transformPropertyData");
  next();
};
