import express from "express";
import * as userController from "../controllers/userController.js";
const router = express.Router();

router.route("/passwordChange").post(userController.passwordChange)

export default router;