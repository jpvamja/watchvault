import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 
                    existingUser.email === email
                        ? "Email already exists"
                        : "Username already exists",
            });
        };

        const user = new User({
            username,
            email,
            password,
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User Registration Successfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        
        console.error("User Registration failed", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};