import { Request, Response, NextFunction } from "express";

/**
 * Middleware de debug para ver exactamente qué datos llegan antes del transform
 */
export const debugBeforeTransform = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("�🚨🚨 DEBUG MIDDLEWARE EJECUTÁNDOSE 🚨🚨🚨");
  console.log("�🔍 DEBUG ANTES DEL TRANSFORM:");
  console.log("📝 Método:", req.method);
  console.log("📝 URL:", req.url);
  console.log("📝 Headers Content-Type:", req.headers["content-type"]);
  console.log("📝 Body completo:", JSON.stringify(req.body, null, 2));

  // Verificar específicamente los campos de características
  console.log("🔍 Verificando campos específicos:");
  console.log(
    "  - caracteristicas.habitaciones:",
    req.body["caracteristicas.habitaciones"]
  );
  console.log("  - caracteristicas.baños:", req.body["caracteristicas.baños"]);
  console.log("  - caracteristicas.area:", req.body["caracteristicas.area"]);

  console.log("✅ DEBUG TERMINADO, continuando...");
  next();
};
