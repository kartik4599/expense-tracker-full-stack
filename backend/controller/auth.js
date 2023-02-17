const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
const keys = require("../util/keys");
const sequelize = require("../util/database");
const ForgotPasswordRequest = require("../model/forgotPassword");
const { v4 } = require("uuid");
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
  const tran = sequelize.transaction();
  const { name, email, password } = req.body;

  bcrypt.hash(password, 8, (err, hash) => {
    console.log(hash, err);
    User.create(
      {
        name,
        email,
        password: hash,
      },
      { transaction: tran }
    )
      .then((data) => {
        tran.commit();
        res.json({ data, status: "success" });
      })
      .catch((e) => {
        tran.commit();
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
  const id = v4();
  console.log(id);
  User.findAll({ where: { email }, attributes: ["id"] })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      if (jsonData.length > 0) {
        return ForgotPasswordRequest.create({
          id,
          isActive: true,
          userId: jsonData[0].id,
        });
      } else {
        res.json({ status: "email not found" });
      }
    })
    .then((data) => {
      const sender = {
        name: "Reset Password",
        email: "alibabas@expense.com",
      };
      const recivers = [
        {
          email: email,
        },
      ];
      return tranEmailApi.sendTransacEmail({
        sender,
        to: recivers,
        subject: "Reset Password",
        textContent: "Reset Your Password",
        htmlContent: `<a href=http://localhost:2001/auth/resetpassword/${id} > Reset Link </a>`,
      });
    })
    .then((data) => {
      res.status(200).json({ status: "done" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ status: "error" });
    });
};

exports.resetController = (req, res, next) => {
  console.log(req.params.id);
  ForgotPasswordRequest.findByPk(req.params.id)
    .then((data) => {
      if (data.isActive) {
        data.isActive = false;
        data.save();
        res.send(`
        <form action='http://localhost:2001/auth/final' method='POST'>
          <input name='password' placeholder='enter new password'/>
          <input type="hidden" name="id" value=${data.userId} />
          <button type='submit'>Submit</button>
        </form>`);
      } else {
        res.send("<h1>Link Exprire</h1>");
      }
    })
    .catch((e) => {
      res.send("<h1>Link Exprire</h1>");
      console.log(e);
    });
};

exports.finalReset = (req, res, next) => {
  const { password, id } = req.body;

  bcrypt.hash(password, 8, (err, hash) => {
    User.findByPk(id)
      .then((data) => {
        data.password = hash;
        data.save();
        res.send("<h3>Password Has Been Reset!</h3><h3>Login again</h3> ");
      })
      .catch((e) => console.log(e));
  });
};
