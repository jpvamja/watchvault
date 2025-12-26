import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginUser);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Access granted",
        user: req.user,
    });
});

export default router;