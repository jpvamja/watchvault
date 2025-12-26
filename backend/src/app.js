import express from "express";

import authRoutes from "./routes/auth.routes.js";
import mediaRoutes from "./routes/media.routes.js";


const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/media", mediaRoutes);

export default app;