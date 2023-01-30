const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
const keys = require("../util/keys");
require("dotenv").config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;
const Token = (id) => {
  return jwt.sign({ id }, "token");
};

exports.loginController = (req, res, next) => {
  const { email, password } = req.body;
  User.findAll({ where: { email } })
    .then((data) => {
      if (data.length > 0) {
        bcrypt.compare(password, data[0].dataValues.password, (err, result) => {
          if (result) {
            const token = Token(data[0].dataValues.id);
            res.json({ msg: "Login success", token });
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

exports.forgotController = (req, res, next) => {
  const { email } = req.body;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    name: "Reset Password",
    email: "alibaba@expense.com",
  };

  const recivers = [
    {
      email: email,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: recivers,
      subject: "Reset Password",
      textContent: "Reset Your Password",
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({ status: "done" });
    })
    .catch((e) => {
      console.log(e);
    });

  console.log(client);
};
