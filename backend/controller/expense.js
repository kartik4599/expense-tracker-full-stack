const Expense = require("../model/expensetable");

exports.addExpense = (req, res, next) => {
  console.log(req.user);
  const { amount, description, category } = req.body;
  Expense.create({ amount, description, category, userId: req.user.id });
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
  Expense.findAll({ where: { userId: req.user.id } })
    .then((data) => {
      res.json(data);
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
