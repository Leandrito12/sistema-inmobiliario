import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
// import sharp from "sharp"; // Comentado temporalmente

// Asegurar que el directorio existe
const uploadsDir = "uploads/properties";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Crear nombre único para el archivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const cleanName = file.originalname
      .replace(extension, "")
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase()
      .substring(0, 20);
    cb(null, `${cleanName}-${uniqueSuffix}${extension}`);
  },
});

// Filtro de archivos mejorado
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Extensiones permitidas
  const allowedExtensions = process.env.ALLOWED_EXTENSIONS?.split(",") || [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];
  const fileExtension = path.extname(file.originalname).slice(1).toLowerCase();

  // Verificar extensión
  if (!allowedExtensions.includes(fileExtension)) {
    cb(
      new Error(
        `Tipo de archivo no permitido. Extensiones permitidas: ${allowedExtensions.join(
          ", "
        )}`
      )
    );
    return;
  }

  // Verificar tipo MIME
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new Error("Tipo de archivo no válido"));
    return;
  }

  cb(null, true);
};

// Configuración de multer con límites más grandes
export const uploadImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || "52428800"), // 50MB por defecto (aumentado para alta calidad)
    files: 10, // Máximo 10 archivos
    fieldSize: 100 * 1024 * 1024, // 100MB para form fields
  },
});

// Middleware para múltiples imágenes
export const uploadMultipleImages = uploadImages.array("images", 10);

// Middleware para una sola imagen
export const uploadSingleImage = uploadImages.single("image");

// Middleware para procesar las imágenes después de la subida (versión simplificada)
export const processUploadedImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files && Array.isArray(req.files)) {
    // Procesar múltiples imágenes
    const processedImages = req.files.map(
      (file: Express.Multer.File, index: number) => {
        return {
          _id: new mongoose.Types.ObjectId(),
          url: `/uploads/properties/${file.filename}`,
          alt: req.body.titulo
            ? `${req.body.titulo} - Imagen ${index + 1}`
            : `Imagen ${index + 1}`,
          orden: index + 1,
          nombreArchivo: file.filename,
          tamano: file.size,
          tamanoOriginal: file.size,
          compresion: 0, // Sin compresión por ahora
          tipo: file.mimetype,
          esPortada: index === 0,
          thumbnail: "",
          dimensiones: {
            width: 0,
            height: 0,
          },
        };
      }
    );

    // Agregar al body de la request
    req.body.imagenes = processedImages;

    // Log para debug
    console.log(`📸 Procesadas ${processedImages.length} imágenes:`);
    processedImages.forEach((img, index) => {
      console.log(
        `   ${index + 1}. ${img.nombreArchivo} - ${(
          img.tamano /
          1024 /
          1024
        ).toFixed(2)} MB`
      );
    });
  } else if (req.file) {
    // Procesar una sola imagen
    const processedImage = {
      _id: new mongoose.Types.ObjectId(),
      url: `/uploads/properties/${req.file.filename}`,
      alt: req.body.titulo
        ? `${req.body.titulo} - Imagen principal`
        : "Imagen principal",
      orden: 1,
      nombreArchivo: req.file.filename,
      tamano: req.file.size,
      tamanoOriginal: req.file.size,
      compresion: 0,
      tipo: req.file.mimetype,
      esPortada: true,
      thumbnail: "",
      dimensiones: {
        width: 0,
        height: 0,
      },
    };

    req.body.imagenes = [processedImage];

    console.log(
      `📸 Procesada imagen: ${processedImage.nombreArchivo} - ${(
        processedImage.tamano /
        1024 /
        1024
      ).toFixed(2)} MB`
    );
  }

  next();
};

// Función para eliminar archivos de imagen del sistema
export const deleteImageFiles = (
  imagenes: Array<{ nombreArchivo: string }>
) => {
  imagenes.forEach((imagen) => {
    const filePath = path.join(uploadsDir, imagen.nombreArchivo);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`📸 Imagen eliminada: ${imagen.nombreArchivo}`);
      } catch (error) {
        console.error(
          `❌ Error eliminando imagen ${imagen.nombreArchivo}:`,
          error
        );
      }
    }
  });
};

// Middleware para validar y reordenar imágenes
export const validateImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.imagenes && Array.isArray(req.body.imagenes)) {
    // Asegurar que solo hay una imagen de portada
    let portadaCount = 0;
    req.body.imagenes.forEach((imagen: any, index: number) => {
      if (imagen.esPortada) {
        portadaCount++;
        if (portadaCount > 1) {
          imagen.esPortada = false; // Solo la primera puede ser portada
        }
      }
      // Asegurar orden secuencial
      imagen.orden = index + 1;
    });

    // Si no hay portada, hacer que la primera sea portada
    if (portadaCount === 0 && req.body.imagenes.length > 0) {
      req.body.imagenes[0].esPortada = true;
    }
  }

  next();
};
