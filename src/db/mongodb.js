import { mongodbConfig } from "../config/index.js";
import mongoose from "mongoose";

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(mongodbConfig.mongoUrl)
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.error("Database connection error", err);
            });
    }
}

export default new Database();
