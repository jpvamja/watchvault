import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginUser);

export default router;