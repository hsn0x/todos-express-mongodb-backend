export default {
    database: process.env.MONGO_DB_DATABASE,
    username: process.env.MONGO_DB_USERNAME,
    password: process.env.MONGO_DB_PASSWORD,
    hostname: process.env.MONGO_DB_HOSTNAME,
    port: process.env.MONGO_DB_PORT,
    mongoUrl: `mongodb://${process.env.MONGO_DB_HOSTNAME}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_DATABASE}`,
};
