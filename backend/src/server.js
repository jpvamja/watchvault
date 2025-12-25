import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";


app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});