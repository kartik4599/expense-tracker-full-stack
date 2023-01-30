const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/login", authController.loginController);

router.post("/signup", authController.signUpController);

router.post("/forgot", authController.forgotController);

module.exports = router;
