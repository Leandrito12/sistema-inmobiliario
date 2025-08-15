import express from "express";
import {
  getAmenities,
  getAmenityCategories,
  createAmenity,
  updateAmenity,
  deleteAmenity
} from "../controllers/amenityController";
import { authenticate, authorizeAdmin } from "../middleware/auth";

const router = express.Router();

// Rutas públicas (para el formulario)
router.get("/", getAmenities);
router.get("/categories", getAmenityCategories);

// Rutas protegidas (solo admin)
router.post("/", authenticate, authorizeAdmin, createAmenity);
router.put("/:id", authenticate, authorizeAdmin, updateAmenity);
router.delete("/:id", authenticate, authorizeAdmin, deleteAmenity);

export default router;
