import { MongoClient } from "mongodb";
import { mongodbConfig } from "../config/index.js";

// Connection URL
const url = mongodbConfig.mongoUrl;
const client = new MongoClient(url);

// Database Name
const dbName = mongodbConfig.database;

const mongodb = async () => {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("documents");

    // the following code examples can be pasted here...

    return "done.";
};

export default mongodb;
