import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  // Log del error
  console.error(`❌ Error ${statusCode}: ${message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Errores de MongoDB
  if (err.name === "ValidationError") {
    const errors = Object.values((err as any).errors).map(
      (val: any) => val.message
    );
    res.status(400).json({
      success: false,
      message: "Error de validación",
      errors,
    });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "ID inválido",
    });
    return;
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    res.status(400).json({
      success: false,
      message: `El ${field} ya existe`,
    });
    return;
  }

  // Error de JWT
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      success: false,
      message: "Token inválido",
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      success: false,
      message: "Token expirado",
    });
    return;
  }

  // Error por defecto
  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Error interno del servidor"
        : message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
