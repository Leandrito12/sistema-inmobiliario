import { Response } from "express";
import { Property } from "../models/Property";
import { asyncHandler } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import { deleteImageFiles } from "../middleware/upload";
import path from "path";
import fs from "fs";

// @desc    Obtener todas las propiedades
// @route   GET /api/properties
// @access  Public
export const getProperties = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Filtros
    const filters: any = {};

    if (req.query.tipo) filters.tipo = req.query.tipo;
    if (req.query.operacion) filters.operacion = req.query.operacion;
    if (req.query.estado) filters.estado = req.query.estado;
    if (req.query.ciudad)
      filters["ubicacion.ciudad"] = new RegExp(req.query.ciudad as string, "i");

    // Filtro de precio
    if (req.query.precioMin || req.query.precioMax) {
      filters.precio = {};
      if (req.query.precioMin)
        filters.precio.$gte = parseFloat(req.query.precioMin as string);
      if (req.query.precioMax)
        filters.precio.$lte = parseFloat(req.query.precioMax as string);
    }

    // Ordenamiento
    let sortBy = "-fechaPublicacion"; // Por defecto más recientes primero
    if (req.query.sortBy) {
      sortBy = req.query.sortBy as string;
    }

    const properties = await Property.find(filters)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(filters);

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProperties: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  }
);

// @desc    Obtener propiedad por ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    res.json({
      success: true,
      data: { property },
    });
  }
);

// @desc    Crear nueva propiedad
// @route   POST /api/properties
// @access  Private (Admin)
export const createProperty = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const propertyData = req.body;

    // Las imágenes ya fueron procesadas por el middleware processUploadedImages
    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: "Propiedad creada exitosamente",
      data: { property },
    });
  }
);

// @desc    Actualizar propiedad
// @route   PUT /api/properties/:id
// @access  Private (Admin)
export const updateProperty = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    console.log("� INICIO ACTUALIZACIÓN DE PROPIEDAD 🚨");
    console.log("📝 ID recibido en params:", req.params.id);
    console.log("📝 Tipo de ID:", typeof req.params.id);
    console.log("📝 URL completa:", req.url);
    console.log("📝 Método:", req.method);
    console.log("📝 Datos recibidos:", JSON.stringify(req.body, null, 2));

    let property = await Property.findById(req.params.id);

    if (!property) {
      console.log("❌ PROPIEDAD NO ENCONTRADA CON ID:", req.params.id);
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    console.log("✅ PROPIEDAD ENCONTRADA:");
    console.log("📋 ID de la propiedad:", property._id);
    console.log("📋 Título actual:", property.titulo);
    console.log("📋 Características actuales:", property.caracteristicas);

    console.log(
      "📝 Propiedad antes de actualizar:",
      JSON.stringify(property.toObject(), null, 2)
    );

    const updateData = req.body;
    console.log(
      "📝 Datos que se enviarán a MongoDB:",
      JSON.stringify(updateData, null, 2)
    );

    // Si se subieron nuevas imágenes, eliminar las anteriores
    if (req.body.imagenes && req.body.imagenes.length > 0) {
      // Eliminar imágenes anteriores del sistema de archivos
      if (property.imagenes && property.imagenes.length > 0) {
        deleteImageFiles(property.imagenes);
      }
    }

    console.log("🔄 EJECUTANDO FINDBYIDANDUPDATE...");
    console.log("🔄 ID usado para actualizar:", req.params.id);
    console.log(
      "🔄 Datos de actualización:",
      JSON.stringify(updateData, null, 2)
    );

    property = await Property.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    });

    console.log("✅ ACTUALIZACIÓN COMPLETADA");
    console.log(
      "📋 Propiedad actualizada:",
      JSON.stringify(property?.toObject(), null, 2)
    );

    // Verificar que sea la propiedad correcta
    console.log("🔍 VERIFICACIÓN:");
    console.log("📋 ID de la propiedad actualizada:", property?._id);
    console.log("📋 Título actualizado:", property?.titulo);
    console.log("📋 Características actualizadas:", property?.caracteristicas);

    console.log(
      "📝 Propiedad después de actualizar:",
      JSON.stringify(property?.toObject(), null, 2)
    );

    res.json({
      success: true,
      message: "Propiedad actualizada exitosamente",
      data: { property },
    });
  }
);

// @desc    Eliminar propiedad
// @route   DELETE /api/properties/:id
// @access  Private (Admin)
export const deleteProperty = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    // Eliminar imágenes del sistema de archivos
    if (property.imagenes && property.imagenes.length > 0) {
      deleteImageFiles(property.imagenes);
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Propiedad eliminada exitosamente",
    });
  }
);

// @desc    Obtener propiedades destacadas
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const properties = await Property.find({
      destacado: true,
      estado: "disponible",
    })
      .sort("-fechaPublicacion")
      .limit(6);

    res.json({
      success: true,
      data: { properties },
    });
  }
);

// @desc    Buscar propiedades
// @route   GET /api/properties/search
// @access  Public
export const searchProperties = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Término de búsqueda requerido",
      });
    }

    const searchRegex = new RegExp(q as string, "i");

    const properties = await Property.find({
      $or: [
        { titulo: searchRegex },
        { descripcion: searchRegex },
        { "ubicacion.direccion": searchRegex },
        { "ubicacion.ciudad": searchRegex },
        { amenidades: { $in: [searchRegex] } },
      ],
      estado: "disponible",
    }).limit(20);

    res.json({
      success: true,
      data: { properties },
    });
  }
);

// @desc    Agregar imágenes a una propiedad existente
// @route   POST /api/properties/:id/images
// @access  Private (Admin)
export const addPropertyImages = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    // Las nuevas imágenes ya fueron procesadas por el middleware
    if (req.body.imagenes && req.body.imagenes.length > 0) {
      // Reordenar todas las imágenes
      const existingImages = property.imagenes || [];
      const newImages = req.body.imagenes.map((img: any, index: number) => ({
        ...img,
        orden: existingImages.length + index + 1,
        esPortada: existingImages.length === 0 && index === 0, // Solo si no hay imágenes existentes
      }));

      property.imagenes = [...existingImages, ...newImages];
      await property.save();
    }

    res.json({
      success: true,
      message: "Imágenes agregadas exitosamente",
      data: { property },
    });
  }
);

// @desc    Eliminar una imagen específica de una propiedad
// @route   DELETE /api/properties/:id/images/:imageId
// @access  Private (Admin)
export const deletePropertyImage = asyncHandler(
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

    // Eliminar archivo del sistema
    const imageToDelete = property.imagenes[imageIndex];
    deleteImageFiles([imageToDelete]);

    // Eliminar de la base de datos
    property.imagenes.splice(imageIndex, 1);

    // Reordenar imágenes restantes
    property.imagenes.forEach((img, index) => {
      img.orden = index + 1;
    });

    // Si era la portada, hacer que la primera sea la nueva portada
    if (imageToDelete.esPortada && property.imagenes.length > 0) {
      property.imagenes[0].esPortada = true;
    }

    await property.save();

    res.json({
      success: true,
      message: "Imagen eliminada exitosamente",
      data: { property },
    });
  }
);

// @desc    Establecer imagen como portada
// @route   PUT /api/properties/:id/images/:imageId/cover
// @access  Private (Admin)
export const setImageAsCover = asyncHandler(
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

    // Quitar portada de todas las imágenes
    property.imagenes.forEach((img) => {
      img.esPortada = false;
    });

    // Establecer la nueva portada
    property.imagenes[imageIndex].esPortada = true;

    await property.save();

    res.json({
      success: true,
      message: "Imagen establecida como portada",
      data: { property },
    });
  }
);

// @desc    Reordenar imágenes de una propiedad
// @route   PUT /api/properties/:id/images/reorder
// @access  Private (Admin)
export const reorderPropertyImages = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const { imageOrder } = req.body; // Array de IDs en el nuevo orden

    if (!Array.isArray(imageOrder)) {
      return res.status(400).json({
        success: false,
        message: "Se requiere un array de IDs de imágenes",
      });
    }

    // Reordenar las imágenes según el array proporcionado
    const reorderedImages = imageOrder.map((imageId: string, index: number) => {
      const image = property.imagenes.find(
        (img) => img._id?.toString() === imageId
      );
      if (!image) {
        throw new Error(`Imagen con ID ${imageId} no encontrada`);
      }
      return {
        ...image,
        orden: index + 1,
      };
    });

    // Validar que todos los IDs sean válidos
    if (reorderedImages.length !== property.imagenes.length) {
      return res.status(400).json({
        success: false,
        message: "Todos los IDs de imágenes deben ser válidos",
      });
    }

    // Actualizar el orden de las imágenes
    property.imagenes = reorderedImages;
    await property.save();

    res.json({
      success: true,
      message: "Orden de imágenes actualizado exitosamente",
      data: { property },
    });
  }
);

// @desc    Cambiar estado de una propiedad
// @route   PUT /api/properties/:id/status
// @access  Private (Admin)
export const updatePropertyStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { estado } = req.body;

    // Validar que el estado sea uno de los permitidos
    const validStates = ["disponible", "vendido", "alquilado", "reservado"];
    if (!validStates.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: "Estado no válido. Estados permitidos: " + validStates.join(", "),
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    // Actualizar solo el estado
    property.estado = estado;
    await property.save();

    res.json({
      success: true,
      message: `Estado de la propiedad actualizado a: ${estado}`,
      data: { property },
    });
  }
);

// @desc    Obtener estadísticas de imágenes
// @route   GET /api/properties/:id/images/stats
// @access  Private (Admin)
export const getPropertyImageStats = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Propiedad no encontrada",
      });
    }

    const imageStats = {
      totalImages: property.imagenes.length,
      coverImage: property.imagenes.find((img) => img.esPortada),
      totalSize: property.imagenes.reduce(
        (sum, img) => sum + (img.tamano || 0),
        0
      ),
      imageTypes: property.imagenes.reduce((types: any, img) => {
        types[img.tipo || "unknown"] = (types[img.tipo || "unknown"] || 0) + 1;
        return types;
      }, {}),
      imagesOrderedBySize: property.imagenes
        .sort((a, b) => (b.tamano || 0) - (a.tamano || 0))
        .slice(0, 5)
        .map((img) => ({
          _id: img._id,
          nombreArchivo: img.nombreArchivo,
          tamano: img.tamano,
          tipo: img.tipo,
          esPortada: img.esPortada,
        })),
    };

    res.json({
      success: true,
      data: { imageStats },
    });
  }
);
