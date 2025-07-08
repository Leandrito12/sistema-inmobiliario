import sharp from "sharp";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

// Configuraciones de optimización
const IMAGE_QUALITY = {
  jpeg: 85,
  png: 80,
  webp: 80,
};

const MAX_DIMENSIONS = {
  width: 1920,
  height: 1080,
  thumbnail: {
    width: 300,
    height: 200,
  },
};

// Interface para opciones de optimización
interface OptimizationOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: "jpeg" | "png" | "webp";
  generateThumbnail?: boolean;
}

// Función para optimizar una imagen
export const optimizeImage = async (
  inputPath: string,
  outputPath: string,
  options: OptimizationOptions = {}
): Promise<{
  success: boolean;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  thumbnailPath?: string;
}> => {
  try {
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;

    // Configurar Sharp con las opciones
    let sharpInstance = sharp(inputPath);

    // Redimensionar si es necesario
    if (options.maxWidth || options.maxHeight) {
      sharpInstance = sharpInstance.resize({
        width: options.maxWidth || MAX_DIMENSIONS.width,
        height: options.maxHeight || MAX_DIMENSIONS.height,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Aplicar formato y calidad
    switch (options.format || "jpeg") {
      case "jpeg":
        sharpInstance = sharpInstance.jpeg({
          quality: options.quality || IMAGE_QUALITY.jpeg,
          progressive: true,
          mozjpeg: true,
        });
        break;
      case "png":
        sharpInstance = sharpInstance.png({
          quality: options.quality || IMAGE_QUALITY.png,
          compressionLevel: 9,
          palette: true,
        });
        break;
      case "webp":
        sharpInstance = sharpInstance.webp({
          quality: options.quality || IMAGE_QUALITY.webp,
          effort: 6,
        });
        break;
    }

    // Procesar la imagen principal
    await sharpInstance.toFile(outputPath);

    // Generar thumbnail si se solicita
    let thumbnailPath: string | undefined;
    if (options.generateThumbnail) {
      const thumbnailName =
        path.basename(outputPath, path.extname(outputPath)) +
        "_thumb" +
        path.extname(outputPath);
      thumbnailPath = path.join(path.dirname(outputPath), thumbnailName);

      await sharp(inputPath)
        .resize(
          MAX_DIMENSIONS.thumbnail.width,
          MAX_DIMENSIONS.thumbnail.height,
          {
            fit: "cover",
            position: "center",
          }
        )
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);
    }

    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    const compressionRatio = Math.round(
      (1 - optimizedSize / originalSize) * 100
    );

    // Eliminar archivo original si es diferente
    if (inputPath !== outputPath) {
      fs.unlinkSync(inputPath);
    }

    return {
      success: true,
      originalSize,
      optimizedSize,
      compressionRatio,
      thumbnailPath,
    };
  } catch (error) {
    console.error("Error optimizando imagen:", error);
    return {
      success: false,
      originalSize: 0,
      optimizedSize: 0,
      compressionRatio: 0,
    };
  }
};

// Middleware para optimizar imágenes después de la subida
export const optimizeUploadedImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    const files =
      (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);
    const optimizedImages = [];

    for (const file of files) {
      const originalPath = file.path;
      const optimizedPath = originalPath.replace(/\.[^/.]+$/, "_optimized$&");

      // Determinar formato de salida basado en el tamaño
      const fileSize = file.size;
      let format: "jpeg" | "png" | "webp" = "jpeg";
      let quality = IMAGE_QUALITY.jpeg;

      // Para archivos muy grandes, usar WebP para mejor compresión
      if (fileSize > 10 * 1024 * 1024) {
        // > 10MB
        format = "webp";
        quality = 70;
      } else if (fileSize > 5 * 1024 * 1024) {
        // > 5MB
        format = "jpeg";
        quality = 75;
      }

      // Optimizar la imagen
      const result = await optimizeImage(originalPath, optimizedPath, {
        format,
        quality,
        maxWidth: MAX_DIMENSIONS.width,
        maxHeight: MAX_DIMENSIONS.height,
        generateThumbnail: true,
      });

      if (result.success) {
        // Actualizar información del archivo
        const optimizedFile = {
          ...file,
          path: optimizedPath,
          filename: path.basename(optimizedPath),
          size: result.optimizedSize,
          originalSize: result.originalSize,
          compressionRatio: result.compressionRatio,
          thumbnailPath: result.thumbnailPath,
        };

        optimizedImages.push(optimizedFile);

        console.log(`📸 Imagen optimizada: ${file.originalname}`);
        console.log(
          `   Original: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`
        );
        console.log(
          `   Optimizada: ${(result.optimizedSize / 1024 / 1024).toFixed(2)} MB`
        );
        console.log(`   Compresión: ${result.compressionRatio}%`);
      } else {
        // Si la optimización falla, usar el archivo original
        optimizedImages.push(file);
      }
    }

    // Reemplazar los archivos en el request
    if (req.files) {
      req.files = optimizedImages;
    } else if (req.file) {
      req.file = optimizedImages[0];
    }

    next();
  } catch (error) {
    console.error("Error en optimización de imágenes:", error);
    next(error);
  }
};

// Función para validar el tamaño de archivo antes de procesar
export const validateFileSize = (maxSize: number = 50 * 1024 * 1024) => {
  // 50MB por defecto
  return (req: Request, res: Response, next: NextFunction) => {
    const files =
      (req.files as Express.Multer.File[]) || (req.file ? [req.file] : []);

    for (const file of files) {
      if (file.size > maxSize) {
        return res.status(413).json({
          success: false,
          message: `Archivo demasiado grande: ${
            file.originalname
          }. Tamaño máximo permitido: ${(maxSize / 1024 / 1024).toFixed(0)}MB`,
          data: {
            fileName: file.originalname,
            fileSize: file.size,
            maxSize: maxSize,
          },
        });
      }
    }

    next();
  };
};

// Función para limpiar archivos temporales
export const cleanupTempFiles = (files: Express.Multer.File[]) => {
  files.forEach((file) => {
    if (fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error(`Error eliminando archivo temporal: ${file.path}`, error);
      }
    }
  });
};

// Función para obtener información de imagen
export const getImageInfo = async (filePath: string) => {
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = fs.statSync(filePath);

    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: stats.size,
      density: metadata.density,
      hasAlpha: metadata.hasAlpha,
      channels: metadata.channels,
    };
  } catch (error) {
    console.error("Error obteniendo información de imagen:", error);
    return null;
  }
};

export default {
  optimizeImage,
  optimizeUploadedImages,
  validateFileSize,
  cleanupTempFiles,
  getImageInfo,
};
