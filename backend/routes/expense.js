const express = require("express");
const routes = express.Router();
const expenseController = require("../controller/expense");
const expenseMiddle = require("../middleware/authMiddleware");

routes.post(
  "/addExpense",
  expenseMiddle.authUser,
  expenseController.addExpense
);

routes.patch(
  "/update/:id",
  expenseMiddle.authUser,
  expenseController.updateExpense
);

routes.get("/getExpense", expenseMiddle.authUser, expenseController.getExpense);

routes.delete(
  "/delete/:id",
  expenseMiddle.authUser,
  expenseController.deleteExpense
);

module.exports = routes;
