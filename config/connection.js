const Sequelize = require("sequelize");
require("dotenv").config();

// Establishing database connection.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'https://git.heroku.com/gibberg-better-reads.git',
        dialect: 'mysql',
        port: 3306,
      }
    );

module.exports = sequelize;
