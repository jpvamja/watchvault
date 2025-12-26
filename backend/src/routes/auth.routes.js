import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateRequiredFields } from "../middlewares/validate.middleware.js";
import { changePassword } from "../controllers/auth.controller.js";

const router = Router();

router.post(
    "/register",
    validateRequiredFields(["username", "email", "password"]),
    registerUser
);

router.post(
    "/login",
    validateRequiredFields(["email", "password"]),
    loginUser
);

router.get(
    "/protected",
    authMiddleware,
    (req, res) => {
        const { id, username } = req.user;
        res.status(200).json({
            success: true,
            message: "Auth pipeline verified successfully",
            userId: id,
            username,
        });
    }
);

router.patch(
    "/change-password",
    authMiddleware,
    changePassword
)

router.post(
    "/logout",
    authMiddleware,
    logoutUser
);


export default router;