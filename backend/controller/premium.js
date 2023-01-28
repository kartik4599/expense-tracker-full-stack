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
      console.log(jsonData);
      jsonData.sort((a, b) => b.total - a.total);
      console.log(jsonData);
      res.json(jsonData);
      // let idData = jsonData.reduce((r, a) => {
      //   r[a.userId] = r[a.userId] || [];
      //   r[a.userId].push(a);
      //   return r;
      // }, Object.create(null));

      // const sendData = [];
      // for (let i in idData) {
      //   User.findByPk(i, { attributes: ["name"] })
      //     .then((data) => {
      //       let expense = 0;
      //       idData[i].forEach((e) => (expense += e.amount));
      //       const userData = JSON.parse(JSON.stringify(data));
      //       console.log(userData);
      //       const sendOBj = {
      //         name: userData.name,
      //         expense,
      //       };
      //       return sendData.push(sendOBj);
      //     })
      //     .catch((e) => console.log(e));
      // }
      // setTimeout(() => {
      //   sendData.sort((a, b) => b.expense - a.expense);
      //   res.json(sendData);
      // }, 1000);
      // console.log(sendData);
    })
    .catch((e) => console.log(e));
};
