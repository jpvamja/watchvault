import jwt from "jsonwebtoken"

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
        }
    );
};