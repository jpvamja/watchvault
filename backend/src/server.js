import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`App listening on port http://localhost:${PORT}`);
            console.log(`Environment: ${NODE_ENV}`);
        });
    } catch (error) {
        console.error("Server failed to start.");
        console.error(error.message);

        process.exit(1);
    }
};

startServer();

