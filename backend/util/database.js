const Sequelize = require("sequelize");

const DB = new Sequelize("expense", "root", "root1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = DB;
