import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginUser);

router.get("/protected", authMiddleware, (req, res) => {

    const {id, username} = req.user;
    res.status(200).json({
        success: true,
        message: "Auth pipeline verified successfully",
        userId: id,
        username,
    });
});

export default router;