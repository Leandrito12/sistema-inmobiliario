import express from "express";
import {
  loginAdmin,
  getProfile,
  verifyToken,
  changePassword,
} from "../controllers/authController";
import { authenticate, authorizeAdmin } from "../middleware/auth";

const router = express.Router();

// Rutas públicas
router.post("/login", loginAdmin);

// Rutas protegidas
router.use(authenticate);
router.use(authorizeAdmin);

router.get("/profile", getProfile);
router.get("/verify", verifyToken);
router.put("/change-password", changePassword);

export default router;
