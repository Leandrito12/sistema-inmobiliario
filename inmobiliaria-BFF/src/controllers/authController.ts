import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { asyncHandler } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";

// Generar JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

// @desc    Login de administrador
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;

    // Validación de campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }

    // Buscar usuario
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Generar token
    const token = generateToken(user._id as string);

    res.json({
      success: true,
      message: "Login exitoso",
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.email.split("@")[0], // Usar parte del email como nombre
        },
        token,
      },
    });
  }
);

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = req.user;

    res.json({
      success: true,
      data: {
        user: {
          id: user!._id,
          email: user!.email,
          role: user!.role,
          createdAt: user!.createdAt,
        },
      },
    });
  }
);

// @desc    Verificar token
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.json({
      success: true,
      message: "Token válido",
      data: {
        user: {
          id: req.user!._id,
          email: req.user!.email,
          role: req.user!.role,
        },
      },
    });
  }
);

// @desc    Cambiar contraseña
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    // Validación de campos
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Contraseña actual y nueva contraseña son requeridas",
      });
    }

    // Obtener usuario con contraseña
    const user = await User.findById(req.user!._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Contraseña actual incorrecta",
      });
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Contraseña actualizada exitosamente",
    });
  }
);
