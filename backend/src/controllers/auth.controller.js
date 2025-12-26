import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/token.util.js";

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
            user: {
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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        };

        const accessToken = generateAccessToken(user);

        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login failed", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        };

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Invalid request",
            });
        };

        if (oldPassword === newPassword) {
            return res.status(400).json({
                message: "Invalid request",
            });
        };

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        };

        user.password = newPassword;

        await user.save();

        return res.status(200).json({
            message: "Password changed successfully",
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
        });

    }
};


export const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        console.error("Logout failed", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
