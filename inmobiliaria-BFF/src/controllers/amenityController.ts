import { Request, Response } from "express";
import { Amenity } from "../models/Amenity";

// Obtener todas las amenidades activas
export const getAmenities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    
    // Construir filtros
    const filters: any = { isActive: true };
    
    if (category && category !== 'all') {
      filters.category = category;
    }
    
    if (search) {
      filters.$text = { $search: search as string };
    }
    
    const amenities = await Amenity.find(filters)
      .select('name category description')
      .sort({ category: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      data: amenities,
      count: amenities.length
    });
  } catch (error: any) {
    console.error("Error obteniendo amenidades:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las amenidades",
      error: error.message
    });
  }
};

// Obtener categorías de amenidades
export const getAmenityCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Amenity.distinct('category', { isActive: true });
    
    res.status(200).json({
      success: true,
      data: categories.sort()
    });
  } catch (error: any) {
    console.error("Error obteniendo categorías:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las categorías",
      error: error.message
    });
  }
};

// Crear nueva amenidad (solo admin)
export const createAmenity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, description } = req.body;
    
    // Verificar si ya existe
    const existingAmenity = await Amenity.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });
    
    if (existingAmenity) {
      res.status(400).json({
        success: false,
        message: "Ya existe una amenidad con ese nombre"
      });
      return;
    }
    
    const amenity = new Amenity({
      name: name.trim(),
      category,
      description: description?.trim()
    });
    
    await amenity.save();
    
    res.status(201).json({
      success: true,
      message: "Amenidad creada exitosamente",
      data: amenity
    });
  } catch (error: any) {
    console.error("Error creando amenidad:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear la amenidad",
      error: error.message
    });
  }
};

// Actualizar amenidad (solo admin)
export const updateAmenity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, category, description, isActive } = req.body;
    
    const amenity = await Amenity.findByIdAndUpdate(
      id,
      {
        name: name?.trim(),
        category,
        description: description?.trim(),
        isActive
      },
      { new: true, runValidators: true }
    );
    
    if (!amenity) {
      res.status(404).json({
        success: false,
        message: "Amenidad no encontrada"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Amenidad actualizada exitosamente",
      data: amenity
    });
  } catch (error: any) {
    console.error("Error actualizando amenidad:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar la amenidad",
      error: error.message
    });
  }
};

// Eliminar amenidad (solo admin)
export const deleteAmenity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const amenity = await Amenity.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!amenity) {
      res.status(404).json({
        success: false,
        message: "Amenidad no encontrada"
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Amenidad desactivada exitosamente"
    });
  } catch (error: any) {
    console.error("Error eliminando amenidad:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar la amenidad",
      error: error.message
    });
  }
};

// Inicializar amenidades por defecto
export const initializeDefaultAmenities = async (): Promise<void> => {
  try {
    const count = await Amenity.countDocuments();
    
    if (count === 0) {
      console.log("Inicializando amenidades por defecto...");
      
      const defaultAmenities = [
        // Seguridad
        { name: 'Seguridad privada', category: 'Seguridad' },
        { name: 'Vigilancia 24hs', category: 'Seguridad' },
        { name: 'Cámaras de seguridad', category: 'Seguridad' },
        { name: 'Alarma', category: 'Seguridad' },
        { name: 'Portón automático', category: 'Seguridad' },
        { name: 'Intercomunicador', category: 'Seguridad' },
        { name: 'Control de acceso', category: 'Seguridad' },
        { name: 'Circuito cerrado de TV', category: 'Seguridad' },
        { name: 'Seguridad perimetral', category: 'Seguridad' },
        { name: 'Guardia de seguridad', category: 'Seguridad' },
        
        // Espacios recreativos
        { name: 'Piscina', category: 'Espacios recreativos' },
        { name: 'Pileta climatizada', category: 'Espacios recreativos' },
        { name: 'Piscina infinity', category: 'Espacios recreativos' },
        { name: 'Piscina cubierta', category: 'Espacios recreativos' },
        { name: 'Piscina para niños', category: 'Espacios recreativos' },
        { name: 'Solarium', category: 'Espacios recreativos' },
        { name: 'Gimnasio', category: 'Espacios recreativos' },
        { name: 'Spa', category: 'Espacios recreativos' },
        { name: 'Sauna', category: 'Espacios recreativos' },
        { name: 'Jacuzzi', category: 'Espacios recreativos' },
        { name: 'Hidromasaje', category: 'Espacios recreativos' },
        { name: 'Sala de masajes', category: 'Espacios recreativos' },
        { name: 'Sala de relajación', category: 'Espacios recreativos' },
        
        // Deportes y recreación
        { name: 'Cancha de tenis', category: 'Deportes y recreación' },
        { name: 'Cancha de paddle', category: 'Deportes y recreación' },
        { name: 'Cancha de fútbol', category: 'Deportes y recreación' },
        { name: 'Cancha de básquet', category: 'Deportes y recreación' },
        { name: 'Cancha de vóley', category: 'Deportes y recreación' },
        { name: 'Cancha polideportiva', category: 'Deportes y recreación' },
        { name: 'Campo de golf', category: 'Deportes y recreación' },
        { name: 'Mini golf', category: 'Deportes y recreación' },
        { name: 'Pista de jogging', category: 'Deportes y recreación' },
        { name: 'Ciclovia', category: 'Deportes y recreación' },
        { name: 'Playground', category: 'Deportes y recreación' },
        { name: 'Parque infantil', category: 'Deportes y recreación' },
        { name: 'Juegos para niños', category: 'Deportes y recreación' },
        { name: 'Sala de juegos', category: 'Deportes y recreación' },
        { name: 'Salón de juegos', category: 'Deportes y recreación' },
        { name: 'Mesa de ping pong', category: 'Deportes y recreación' },
        { name: 'Mesa de pool', category: 'Deportes y recreación' },
        { name: 'Sala de billar', category: 'Deportes y recreación' },
        
        // Espacios sociales
        { name: 'Sum', category: 'Espacios sociales' },
        { name: 'Salón de fiestas', category: 'Espacios sociales' },
        { name: 'Salon multiusos', category: 'Espacios sociales' },
        { name: 'Quincho', category: 'Espacios sociales' },
        { name: 'Parrilla', category: 'Espacios sociales' },
        { name: 'Asador', category: 'Espacios sociales' },
        { name: 'Fogón', category: 'Espacios sociales' },
        { name: 'Área de parrillas', category: 'Espacios sociales' },
        { name: 'Terraza común', category: 'Espacios sociales' },
        { name: 'Roof garden', category: 'Espacios sociales' },
        { name: 'Rooftop', category: 'Espacios sociales' },
        { name: 'Deck', category: 'Espacios sociales' },
        { name: 'Solarium común', category: 'Espacios sociales' },
        { name: 'Sala de estar común', category: 'Espacios sociales' },
        { name: 'Living comunitario', category: 'Espacios sociales' },
        { name: 'Biblioteca', category: 'Espacios sociales' },
        { name: 'Sala de lectura', category: 'Espacios sociales' },
        { name: 'Sala de reuniones', category: 'Espacios sociales' },
        { name: 'Coworking', category: 'Espacios sociales' },
        { name: 'Business center', category: 'Espacios sociales' },
        
        // Estacionamiento
        { name: 'Garage', category: 'Estacionamiento' },
        { name: 'Cochera cubierta', category: 'Estacionamiento' },
        { name: 'Cochera descubierta', category: 'Estacionamiento' },
        { name: 'Estacionamiento', category: 'Estacionamiento' },
        { name: 'Estacionamiento cubierto', category: 'Estacionamiento' },
        { name: 'Estacionamiento subterráneo', category: 'Estacionamiento' },
        { name: 'Estacionamiento techado', category: 'Estacionamiento' },
        { name: 'Parking para visitas', category: 'Estacionamiento' },
        { name: 'Valet parking', category: 'Estacionamiento' },
        { name: 'Estacionamiento para motos', category: 'Estacionamiento' },
        { name: 'Estacionamiento para bicicletas', category: 'Estacionamiento' },
        
        // Climatización
        { name: 'Aire acondicionado', category: 'Climatización' },
        { name: 'Aire acondicionado central', category: 'Climatización' },
        { name: 'Calefacción central', category: 'Climatización' },
        { name: 'Calefacción por radiadores', category: 'Climatización' },
        { name: 'Calefacción por losa radiante', category: 'Climatización' },
        { name: 'Caldera individual', category: 'Climatización' },
        { name: 'Termotanque', category: 'Climatización' },
        { name: 'Chimenea', category: 'Climatización' },
        { name: 'Chimenea a leña', category: 'Climatización' },
        { name: 'Chimenea a gas', category: 'Climatización' },
        { name: 'Estufa a leña', category: 'Climatización' },
        { name: 'Split frío/calor', category: 'Climatización' },
        
        // Mascotas
        { name: 'Pet friendly', category: 'Mascotas' },
        { name: 'Área para mascotas', category: 'Mascotas' },
        { name: 'Dog park', category: 'Mascotas' },
        { name: 'Guardería canina', category: 'Mascotas' },
        { name: 'Acepta mascotas', category: 'Mascotas' }
      ];
      
      await Amenity.insertMany(defaultAmenities);
      console.log(`✅ ${defaultAmenities.length} amenidades por defecto creadas exitosamente`);
    }
  } catch (error: any) {
    console.error("❌ Error inicializando amenidades por defecto:", error);
  }
};
