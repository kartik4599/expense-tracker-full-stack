const DB = require("../util/database");
const Sequilize = require("sequelize");

const ForgotPasswordRequest = DB.define("forgotpasswords", {
  id: {
    type: Sequilize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  isActive: {
    type: Sequilize.BOOLEAN,
  },
});

module.exports = ForgotPasswordRequest;
