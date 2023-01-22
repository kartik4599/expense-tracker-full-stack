const User = require("../model/user");

exports.loginController = (req, res, next) => {};

exports.signUpController = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.create({
    name,
    email,
    password,
  })
    .then((data) => {
      res.json({ data, status: "success" });
    })
    .catch((e) => {
      User.findAll({ where: { email: email } })
        .then((data) => {
          res.status(301);
          res.json({ "email allready exist": email, status: "fail" });
        })
        .catch((e) => console.log(e));
    });
};
