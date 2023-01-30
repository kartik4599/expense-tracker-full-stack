const keys = require("../util/keys");
const Razorpay = require("razorpay");
const Payment = require("../model/payment");
const User = require("../model/user");
const Expense = require("../model/expensetable");
const Sequelize = require("sequelize");

exports.payment = (req, res, next) => {
  const razor = new Razorpay({
    key_id: keys.key_id,
    key_secret: keys.key_secret,
  });
  const { amount, currency, receipt, notes } = req.body;

  razor.orders.create({ amount, currency, receipt }, (err, order) => {
    if (!err) res.status(201).json({ ...order, key_id: keys.key_id });
    else res.status(301).send(err);
  });
};

exports.paymentRecive = (req, res, next) => {
  User.findByPk(req.user.id)
    .then((data) => {
      console.log(data);
      data.premium = true;
      return data.save();
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => console.log(e));
};

exports.getUser = (req, res, next) => {
  User.findByPk(req.user.id)
    .then((data) => {
      res.json({ status: data.dataValues.premium });
    })
    .catch((e) => console.log(e));
};

exports.leaderboard = (req, res, next) => {
  Expense.findAll({
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    group: ["userId"],
    include: [{ model: User, attributes: ["name"] }],
  })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      jsonData.sort((a, b) => b.total - a.total);
      res.json(jsonData);
    })
    .catch((e) => console.log(e));
};
