import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessToken }  from "../utils/token.util.js";

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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user){
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