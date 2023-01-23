const User = require("../model/user");
const bcrypt = require("bcrypt");
exports.loginController = (req, res, next) => {
  const { email, password } = req.body;
  // const email = .username;
  // const password = req.body.password;
  User.findAll({ where: { email } })
    .then((data) => {
      if (data.length > 0) {
        bcrypt.compare(password, data[0].dataValues.password, (err, result) => {
          if (result) {
            res.json({ msg: "Login success" });
          } else {
            res.json({ msg: "wrong password" });
          }
        });
      } else {
        res.json({ msg: "wrong email" });
      }
    })
    .catch((e) => {
      console.log(e, "error");
    });
};

exports.signUpController = async (req, res, next) => {
  const { name, email, password } = req.body;
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;

  bcrypt.hash(password, 8, (err, hash) => {
    console.log(hash, err);
    User.create({
      name,
      email,
      password: hash,
    })
      .then((data) => {
        res.json({ data, status: "success" });
      })
      .catch((e) => {
        User.findAll({ where: { email: email } })
          .then((data) => {
            if (data.length > 0) {
              res
                .status(301)
                .json({ "email allready exist": email, status: "fail" });
            }
          })
          .catch((e) => console.log(e));
      });
  });
};
