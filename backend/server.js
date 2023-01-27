const app = require("express")();
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/auth");
const ExpenseRouter = require("./routes/expense");
const DB = require("./util/database");
const User = require("./model/user");
const ExpenseTable = require("./model/expensetable");
const Payment = require("./model/payment");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use(ExpenseRouter);

User.hasMany(ExpenseTable);
ExpenseTable.belongsTo(User);
User.hasMany(Payment);
Payment.belongsTo(User);

DB.sync()
  .then((data) => {
    app.listen(2001);
  })
  .catch((e) => {
    console.log(e);
  });
