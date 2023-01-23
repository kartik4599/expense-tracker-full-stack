const app = require("express")();
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/auth");
const DB = require("./util/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

DB.sync({ })
  .then((data) => {
    app.listen(2001);
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(2000);
