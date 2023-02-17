const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const AuthRouter = require("./routes/auth");
const ExpenseRouter = require("./routes/expense");
const PremiumRoutes = require("./routes/premium");
const DB = require("./util/database");
const User = require("./model/user");
const ExpenseTable = require("./model/expensetable");
const Payment = require("./model/payment");
const ForgotPasswordRequest = require("./model/forgotPassword");
const path = require("path");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

app.use("/auth", AuthRouter);
app.use("/premium", PremiumRoutes);
app.use(ExpenseRouter);

User.hasMany(ExpenseTable);
ExpenseTable.belongsTo(User);
User.hasMany(Payment);
Payment.belongsTo(User);
User.hasMany(ForgotPasswordRequest);

DB.sync()
  .then((data) => {
    app.listen(process.env.PORT || 2001);
  })
  .catch((e) => {
    console.log(e);
  });
