import { body, validationResult } from "express-validator";

export const registerValidator = [
    body("username")
        .notEmpty()
        .withMessage("Username is required"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),

    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg,
                })),
            });
        };
        next();
    }
];