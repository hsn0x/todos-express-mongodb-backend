import { mongodbConfig } from "../config/index.js";
import mongoose from "mongoose";

const mongodb = async () => {
    try {
        await mongoose.connect(mongodbConfig.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await mongoose.connection.db.dropDatabase();
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error", error);
    }
};

export default mongodb;
