const Sequelize = require("sequelize");
const DB = require("../util/database");

const User = DB.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  total: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  premium: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
