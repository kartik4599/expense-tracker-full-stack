const app = require("express")();
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/auth");
const ExpenseRouter = require("./routes/expense");
const DB = require("./util/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use(ExpenseRouter);

DB.sync()
  .then((data) => {
    app.listen(2001);
  })
  .catch((e) => {
    console.log(e);
  });
