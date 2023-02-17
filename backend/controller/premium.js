const keys = require("../util/keys");
const Razorpay = require("razorpay");
const Payment = require("../model/payment");
const User = require("../model/user");
const Expense = require("../model/expensetable");
const Sequelize = require("sequelize");
const ExpenseTable = require("../model/expensetable");
const convert = require("json-2-csv");
require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dv7krzlua",
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
  secure: true,
});

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
  User.findAll({ attributes: ["name", "total"] })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      jsonData.sort((a, b) => b.total - a.total);
      res.json(jsonData);
    })
    .catch((e) => console.log(e));

  // Expense.findAll({
  //   attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
  //   group: ["userId"],
  //   include: [{ model: User, attributes: ["name"] }],
  // })
  //   .then((data) => {
  //     const jsonData = JSON.parse(JSON.stringify(data));
  //     console.log(jsonData);
  //     jsonData.sort((a, b) => b.total - a.total);
  //     res.json(jsonData);
  //   })
  //   .catch((e) => console.log(e));
};

exports.download = async (req, res, next) => {
  const data = await ExpenseTable.findAll({
    where: { userId: req.user.id },
    attributes: ["description", "amount", "category"],
  });
  const jsonData = JSON.parse(JSON.stringify(data));
  const csv = await convert.json2csvAsync(jsonData);
  console.log(csv);
  try {
    console.log(csv);
    // const filename = `expense${Date.now()}.csv`;
    // fs.writeFileSync(filename, csv);
    cloudinary.uploader
      .create_zip("expense1675325422223.csv")
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
  console.log(jsonData);
};

// 0
// :
// {name: 'Kartik Mendu', total: 615}
// 1
// :
// {name: 'vivek', total: 0}
