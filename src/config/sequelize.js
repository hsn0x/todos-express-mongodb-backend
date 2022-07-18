export default {
    database: process.env.SEQUELIZE_DB_DATABASE,
    username: process.env.SEQUELIZE_DB_USERNAME,
    password: process.env.SEQUELIZE_DB_PASSWORD,
    options: {
        host: process.env.SEQUELIZE_DB_HOSTNAME,
        dialect: process.env.SEQUELIZE_DB_DIALECT,
        logging: process.env.SEQUELIZE_DB_LOGGING == "true" ? true : false,
    },
};
