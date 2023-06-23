require("dotenv").config();

module.exports = {
  DATABASE: {
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST || `localhost:5432`,
    dialect: "postgres",
    operatorsAliases: false,
    logging: false,
    pool: {
      max: 1,
      min: 1,
      idle: 1000,
      acquire: 1000,
    },
  },
};
