const express = require("express");
const routes = express.Router();
const expenseController = require("../controller/expense");

routes.post("/addExpense", expenseController.addExpense);

routes.patch("/update/:id", expenseController.updateExpense);

routes.get("/getExpense",expenseController.getExpense);

routes.delete("/delete/:id",expenseController.deleteExpense);

module.exports = routes;
