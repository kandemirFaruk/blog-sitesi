import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// Kullanıcı oluşturma
router.route("/signup").post(authController.createUser);

// Kullanıcı giriş
router.route("/signin").post(authController.userLogin);

// Şifre sıfırlama talebi
router.route("/forgot-password").post(authController.forgotPassword);

// Şifre sıfırlama işlemi
router.route("/reset-password/:token").post(authController.resetPassword);

export default router;
