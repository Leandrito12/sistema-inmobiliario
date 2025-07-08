import { Response } from "express";
import { Property } from "../models/Property";
import { asyncHandler } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import path from "path";
import fs from "fs";
import sharp from "sharp";

// @desc    Obtener información detallada de una imagen
// @route   GET /api/properties/:id/images/:imageId/info
// @access  Private (Admin)
export const getImageInfo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const image = property.imagenes.find(
      (img) => img._id?.toString() === req.params.imageId
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Imagen no encontrada",
      });
    }

    // Obtener información adicional del archivo
    const filePath = path.join("uploads/properties", image.nombreArchivo);
    let fileInfo = null;

    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        const metadata = await sharp(filePath).metadata();

        fileInfo = {
          fileSize: stats.size,
          fileCreated: stats.birthtime,
          fileModified: stats.mtime,
          imageWidth: metadata.width,
          imageHeight: metadata.height,
          imageFormat: metadata.format,
          imageChannels: metadata.channels,
          imageDensity: metadata.density,
          hasAlpha: metadata.hasAlpha,
          compressionRatio: image.compresion || 0,
          originalSize: image.tamanoOriginal || stats.size,
        };
      } catch (error) {
        console.error("Error obteniendo información de archivo:", error);
      }
    }

    res.json({
      success: true,
      data: {
        image,
        fileInfo,
      },
    });
  }
);

// @desc    Optimizar imagen existente
// @route   POST /api/properties/:id/images/:imageId/optimize
// @access  Private (Admin)
export const optimizeExistingImage = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const imageIndex = property.imagenes.findIndex(
      (img) => img._id?.toString() === req.params.imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Imagen no encontrada",
      });
    }

    const image = property.imagenes[imageIndex];
    const filePath = path.join("uploads/properties", image.nombreArchivo);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Archivo de imagen no encontrado",
      });
    }

    try {
      const originalStats = fs.statSync(filePath);
      const originalSize = originalStats.size;

      // Configurar optimización basada en parámetros del request
      const { quality = 85, maxWidth = 1920, maxHeight = 1080 } = req.body;

      // Crear archivo optimizado
      const optimizedPath = filePath.replace(/\.[^/.]+$/, "_optimized$&");
      const thumbnailName = image.nombreArchivo.replace(
        /\.[^/.]+$/,
        "_thumb.jpg"
      );
      const thumbnailPath = path.join("uploads/properties", thumbnailName);

      // Optimizar imagen principal
      await sharp(filePath)
        .resize(maxWidth, maxHeight, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: parseInt(quality), progressive: true })
        .toFile(optimizedPath);

      // Crear thumbnail
      await sharp(filePath)
        .resize(300, 200, { fit: "cover", position: "center" })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);

      // Obtener tamaño optimizado
      const optimizedStats = fs.statSync(optimizedPath);
      const optimizedSize = optimizedStats.size;
      const compressionRatio = Math.round(
        (1 - optimizedSize / originalSize) * 100
      );

      // Actualizar imagen en la base de datos
      property.imagenes[imageIndex] = {
        ...image,
        tamano: optimizedSize,
        tamanoOriginal: originalSize,
        compresion: compressionRatio,
        thumbnail: `/uploads/properties/${thumbnailName}`,
      };

      await property.save();

      // Reemplazar archivo original
      fs.unlinkSync(filePath);
      fs.renameSync(optimizedPath, filePath);

      res.json({
        success: true,
        message: "Imagen optimizada exitosamente",
        data: {
          image: property.imagenes[imageIndex],
          optimization: {
            originalSize,
            optimizedSize,
            compressionRatio,
            savedBytes: originalSize - optimizedSize,
          },
        },
      });
    } catch (error) {
      console.error("Error optimizando imagen:", error);
      res.status(500).json({
        success: false,
        message: "Error al optimizar la imagen",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
);

// @desc    Obtener estadísticas de optimización de todas las imágenes
// @route   GET /api/properties/:id/images/optimization-stats
// @access  Private (Admin)
export const getOptimizationStats = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const stats = {
      totalImages: property.imagenes.length,
      totalCurrentSize: property.imagenes.reduce(
        (sum, img) => sum + (img.tamano || 0),
        0
      ),
      totalOriginalSize: property.imagenes.reduce(
        (sum, img) => sum + (img.tamanoOriginal || img.tamano || 0),
        0
      ),
      totalSavedBytes: 0,
      averageCompression: 0,
      optimizedImages: 0,
      largeImages: property.imagenes.filter(
        (img) => (img.tamano || 0) > 5 * 1024 * 1024
      ).length,
      imagesBySize: {
        small: property.imagenes.filter(
          (img) => (img.tamano || 0) < 1024 * 1024
        ).length, // < 1MB
        medium: property.imagenes.filter(
          (img) =>
            (img.tamano || 0) >= 1024 * 1024 &&
            (img.tamano || 0) < 5 * 1024 * 1024
        ).length, // 1-5MB
        large: property.imagenes.filter(
          (img) => (img.tamano || 0) >= 5 * 1024 * 1024
        ).length, // > 5MB
      },
      compressionDetails: property.imagenes.map((img) => ({
        _id: img._id,
        nombreArchivo: img.nombreArchivo,
        tamanoActual: img.tamano,
        tamanoOriginal: img.tamanoOriginal,
        compresion: img.compresion,
        dimensiones: img.dimensiones,
        thumbnail: img.thumbnail,
      })),
    };

    stats.totalSavedBytes = stats.totalOriginalSize - stats.totalCurrentSize;
    stats.optimizedImages = property.imagenes.filter(
      (img) => img.compresion && img.compresion > 0
    ).length;
    stats.averageCompression =
      stats.optimizedImages > 0
        ? Math.round(
            property.imagenes.reduce(
              (sum, img) => sum + (img.compresion || 0),
              0
            ) / stats.optimizedImages
          )
        : 0;

    res.json({
      success: true,
      data: { stats },
    });
  }
);

// @desc    Sugerir optimizaciones para imágenes grandes
// @route   GET /api/properties/:id/images/optimization-suggestions
// @access  Private (Admin)
export const getOptimizationSuggestions = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const suggestions = [];

    for (const image of property.imagenes) {
      const currentSize = image.tamano || 0;
      const suggestion: any = {
        _id: image._id,
        nombreArchivo: image.nombreArchivo,
        tamanoActual: currentSize,
        sugerencias: [],
      };

      // Sugerencias basadas en tamaño
      if (currentSize > 20 * 1024 * 1024) {
        // > 20MB
        suggestion.sugerencias.push({
          tipo: "compression",
          prioridad: "alta",
          descripcion: "Imagen muy grande, se recomienda compresión agresiva",
          accion: "Reducir calidad a 60% y redimensionar a 1920x1080",
          ahorro_estimado: Math.round(currentSize * 0.7),
        });
      } else if (currentSize > 10 * 1024 * 1024) {
        // > 10MB
        suggestion.sugerencias.push({
          tipo: "compression",
          prioridad: "media",
          descripcion: "Imagen grande, se recomienda compresión moderada",
          accion: "Reducir calidad a 75% y redimensionar si es necesario",
          ahorro_estimado: Math.round(currentSize * 0.5),
        });
      } else if (currentSize > 5 * 1024 * 1024) {
        // > 5MB
        suggestion.sugerencias.push({
          tipo: "compression",
          prioridad: "baja",
          descripcion: "Imagen moderadamente grande, optimización ligera",
          accion: "Reducir calidad a 85% manteniendo dimensiones",
          ahorro_estimado: Math.round(currentSize * 0.3),
        });
      }

      // Sugerencias para formato
      if (image.tipo === "image/png" && currentSize > 2 * 1024 * 1024) {
        suggestion.sugerencias.push({
          tipo: "format",
          prioridad: "media",
          descripcion: "PNG grande, considerar conversión a JPEG",
          accion: "Convertir a JPEG con calidad 85%",
          ahorro_estimado: Math.round(currentSize * 0.6),
        });
      }

      // Sugerencias para dimensiones
      if (
        image.dimensiones &&
        (image.dimensiones.width > 1920 || image.dimensiones.height > 1080)
      ) {
        suggestion.sugerencias.push({
          tipo: "resize",
          prioridad: "media",
          descripcion: "Dimensiones muy grandes para web",
          accion: "Redimensionar a máximo 1920x1080",
          ahorro_estimado: Math.round(currentSize * 0.4),
        });
      }

      if (suggestion.sugerencias.length > 0) {
        suggestions.push(suggestion);
      }
    }

    res.json({
      success: true,
      data: { suggestions },
    });
  }
);

export default {
  getImageInfo,
  optimizeExistingImage,
  getOptimizationStats,
  getOptimizationSuggestions,
};
