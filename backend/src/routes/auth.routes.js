import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, registerUser);

export default router;