const express = require("express");
const routes = express.Router();
const premiumController = require("../controller/premium");
const expenseMiddle = require("../middleware/authMiddleware");

routes.post("/payment", expenseMiddle.authUser, premiumController.payment);

routes.get("/isPremium", expenseMiddle.authUser, premiumController.getUser);

routes.post("/recive", expenseMiddle.authUser, premiumController.paymentRecive);

routes.get("/leaderboard", premiumController.leaderboard);

module.exports = routes;
