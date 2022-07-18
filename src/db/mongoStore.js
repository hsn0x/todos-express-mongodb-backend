// initalize sequelize with session store
import session from "express-session";
import MongoStore from "connect-mongo";
import { mongodbConfig } from "../config/index.js";

const url = `mongodb://${mongodbConfig.hostname}:${mongodbConfig.port}`;
const mongoStore = MongoStore.create(options);

export default mongoStore;
