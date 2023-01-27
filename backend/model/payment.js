const sequelize = require("sequelize");
const DB = require("../util/database");

const Payment = DB.define("payment",{
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentid: sequelize.STRING,
  order_id: sequelize.STRING,
  status: sequelize.STRING,
});

module.exports = Payment;
