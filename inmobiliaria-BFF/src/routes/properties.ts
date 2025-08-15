import express from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  searchProperties,
  addPropertyImages,
  deletePropertyImage,
  setImageAsCover,
  reorderPropertyImages,
  getPropertyImageStats,
  updatePropertyStatus,
} from "../controllers/propertyController";
import {
  getImageInfo,
  optimizeExistingImage,
  getOptimizationStats,
  getOptimizationSuggestions,
} from "../controllers/imageController";
import { authenticate, authorizeAdmin } from "../middleware/auth";
import {
  uploadMultipleImages,
  processUploadedImages,
  validateImages,
} from "../middleware/upload";
import { transformPropertyData } from "../middleware/propertyTransform";
import { debugBeforeTransform } from "../middleware/debugMiddleware";

const router = express.Router();

// Rutas públicas
router.get("/featured", getFeaturedProperties);
router.get("/search", searchProperties);
router.get("/:id", getPropertyById);
router.get("/", getProperties);

// Rutas protegidas (Admin)
router.use(authenticate);
router.use(authorizeAdmin);

router.post(
  "/",
  uploadMultipleImages,
  processUploadedImages,
  validateImages,
  transformPropertyData,
  createProperty
);
router.put(
  "/:id",
  uploadMultipleImages,
  processUploadedImages,
  validateImages,
  debugBeforeTransform,
  transformPropertyData,
  updateProperty
);
router.delete("/:id", deleteProperty);

// Ruta para cambiar estado de propiedad
router.put("/:id/status", updatePropertyStatus);

// Rutas específicas para gestión de imágenes
router.post(
  "/:id/images",
  uploadMultipleImages,
  processUploadedImages,
  validateImages,
  addPropertyImages
);
router.get("/:id/images/stats", getPropertyImageStats);
router.get("/:id/images/optimization-stats", getOptimizationStats);
router.get("/:id/images/optimization-suggestions", getOptimizationSuggestions);
router.get("/:id/images/:imageId/info", getImageInfo);
router.post("/:id/images/:imageId/optimize", optimizeExistingImage);
router.delete("/:id/images/:imageId", deletePropertyImage);
router.put("/:id/images/:imageId/cover", setImageAsCover);
router.put("/:id/images/reorder", reorderPropertyImages);

export default router;
