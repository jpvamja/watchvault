import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetExpiry: {
            type: Date,
            select: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (){
    if (!this.isModified("password")) {
        return next();
    };

    this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("User", userSchema);
