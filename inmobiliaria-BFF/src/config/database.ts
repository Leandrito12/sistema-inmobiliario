import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/inmobiliaria";

    await mongoose.connect(mongoURI, {
      dbName: "inmobiliaria" // Especificar explícitamente la base de datos
    });

    console.log("✅ MongoDB conectado exitosamente a la base de datos: inmobiliaria");

    // Crear usuario admin si no existe
    await createDefaultAdmin();
    
    // Inicializar amenidades por defecto
    await initializeDefaultAmenities();
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

const createDefaultAdmin = async (): Promise<void> => {
  try {
    const { User } = await import("../models/User");

    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExists) {
      const admin = new User({
        email: process.env.ADMIN_EMAIL || "admin@inmobiliaria.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        role: "admin",
      });

      await admin.save();
      console.log("✅ Usuario admin creado exitosamente");
    }
  } catch (error) {
    console.error("❌ Error creando usuario admin:", error);
  }
};

const initializeDefaultAmenities = async (): Promise<void> => {
  try {
    const { initializeDefaultAmenities } = await import("../controllers/amenityController");
    await initializeDefaultAmenities();
  } catch (error) {
    console.error("❌ Error inicializando amenidades:", error);
  }
};

export default connectDB;
