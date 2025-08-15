import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import propertyRoutes from "./routes/properties";
import amenityRoutes from "./routes/amenities";
import { errorHandler } from "./middleware/errorHandler";

// Configurar variables de entorno - Actualizado puerto 5001
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Conectar a la base de datos
connectDB();

// Middlewares básicos
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// CORS simple y directo
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    optionsSuccessStatus: 200,
  })
);

// Helmet después de CORS
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Morgan para logging
app.use(morgan("combined"));

// Servir archivos estáticos (imágenes)
app.use("/uploads", express.static("uploads"));

// Endpoint de prueba para verificar configuración de uploads
app.get("/test-uploads", (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const uploadsPath = path.join(__dirname, '../uploads/properties');
  
  try {
    const files = fs.existsSync(uploadsPath) ? fs.readdirSync(uploadsPath) : [];
    res.json({
      success: true,
      message: "Test de configuración de uploads",
      uploadsPath: uploadsPath,
      absolutePath: path.resolve(uploadsPath),
      filesCount: files.length,
      files: files.slice(0, 10), // Solo mostrar primeros 10 archivos
      staticRoute: "/uploads configurado correctamente"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message || "Error al acceder a uploads"
    });
  }
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/amenities", amenityRoutes);

// Ruta de salud
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Servidor funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Ruta de salud específica para API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    port: PORT,
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
});
