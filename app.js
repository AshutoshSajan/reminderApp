require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const studentsRouter = require("./routes/students");
const paymentsRouter = require("./routes/payments");
const authMiddleware = require("./utils/auth-middleware");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/paymentReminderApp", async function(
  err
) {
  console.log("mongoDB connected ?", err ? false : true);
  // Seed the DB.
  require("./utils/seed");
  // const authService = require('./src/auth/authService');
  // const token = await authService.loginMentor('prashant.abhishek7g@gmail.com', 'qwerty123');
  // console.log(token, 'result of authService call');
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", authMiddleware.verifyMentor, studentsRouter);
app.use("/api/v1/payments", authMiddleware.verifyMentor, paymentsRouter);
app.use("*", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
