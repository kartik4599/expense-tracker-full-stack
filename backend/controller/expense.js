const Expense = require("../model/expensetable");
const User = require("../model/user");

exports.addExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  await Expense.create({
    amount,
    description,
    category,
    userId: req.user.id,
  });
  User.findByPk(req.user.id)
    .then((data) => {
      data.total += parseInt(amount);
      data.save();
    })
    .catch((e) => {
      console.log(e);
    });
  // console.log(resp);
  res.json({ status: "added" });
};

exports.updateExpense = (req, res, next) => {
  const { amount, description, category } = req.body;
  Expense.findByPk(req.params.id)
    .then((data) => {
      if (data.userId === req.user.id) {
        (data.amount = amount),
          (data.description = description),
          (data.category = category);
        return data.save();
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};

exports.getExpense = (req, res, next) => {
  console.log(req.params.limit);
  console.log(req.params.pageno);
  const setOffset = req.params.limit * req.params.pageno;

  Expense.findAll({
    where: { userId: req.user.id },
    order: [["id", "DESC"]],
    limit: parseInt(req.params.limit),
    offset: setOffset,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};

exports.getExpenseCount = (req, res, next) => {
  Expense.count({ where: { userId: req.user.id } })
    .then((d) => {
      res.json(d);
      console.log(d);
    })
    .catch((e) => console.log(e));
};

exports.deleteExpense = (req, res, next) => {
  Expense.findByPk(req.params.id)
    .then((data) => {
      if (data.userId === req.user.id) {
        return data.destroy();
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};
