const express = require("express");
const routes = express.Router();
const premiumController = require("../controller/premium");
const expenseMiddle = require("../middleware/authMiddleware");

routes.post("/payment", expenseMiddle.authUser, premiumController.payment);

routes.get("/isPremium", expenseMiddle.authUser, premiumController.getUser);

routes.post("/recive", expenseMiddle.authUser, premiumController.paymentRecive);

routes.get(
  "/leaderboard",
  expenseMiddle.premiumUser,
  premiumController.leaderboard
);

routes.get("/download", expenseMiddle.premiumUser, premiumController.download);

module.exports = routes;
