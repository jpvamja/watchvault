import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            `MongoDB Connected: ${connectionInstance.connection.host}`
        );

        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection failed.");
        console.error(error.message);

        throw error;
    }
};

export default connectDB;