const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.authUser = (req, res, next) => {
  const authToken = req.headers.auth;
  const { id } = jwt.decode(authToken, "token");
  User.findByPk(id)
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((e) => console.log(e));
};

exports.premiumUser = (req, res, next) => {
  const authToken = req.headers.auth;
  const { id } = jwt.decode(authToken, "token");
  User.findByPk(id)
    .then((data) => {
      if (data.premium) {
        console.log("premium");
        req.user = data;
        next();
      } else {
        res.status(301).json({ msg: "no authorized" });
      }
    })
    .catch((e) => console.log(e));
};
