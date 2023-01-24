const Expense = require("../model/expensetable");

exports.addExpense = (req, res, next) => {
  const { amount, description, category } = req.body;
  Expense.create({ amount, description, category });
  res.json({ status: "added" });
};

exports.updateExpense = (req, res, next) => {
  const { amount, description, category } = req.body;
  Expense.findByPk(req.params.id)
    .then((data) => {
      (data.amount = amount),
        (data.description = description),
        (data.category = category);
      return data.save();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};

exports.getExpense = (req, res, next) => {
  Expense.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};

exports.deleteExpense = (req, res, next) => {
  Expense.findByPk(req.params.id)
    .then((data) => {
      return data.destroy();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => console.log(e));
};
