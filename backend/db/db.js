const { Sequelize } = require("sequelize");
const { dbCredential } = require("./dbConfig");

const sequelize =  new Sequelize(
  dbCredential.DB,
  dbCredential.USER,
  dbCredential.PASSWORD,
  {
    host: dbCredential.HOST,
    dialect: dbCredential.dialect,
    operationsAliases: false,
    pool: {
      max: dbCredential.pool.max,
      min: dbCredential.pool.min,
      acquire: dbCredential.pool.acquire,
      idle: dbCredential.pool.idle,
    },
  }
);

const db = {}
db.sequelize = sequelize
db.models = {}
db.models.user = require('../modules/users/users.model')(sequelize, Sequelize.DataTypes)
module.exports = db