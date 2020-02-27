require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
// const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const studentsRouter = require("./routes/students");
const paymentsRouter = require("./routes/payments");
const remindersRouter = require("./routes/reminders");

const authMiddleware = require("./utils/auth-middleware");

require("./utils/node-crone");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

// to fix the payload to large issue limit: "50mb" is added
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

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

// set favicon icon
app.use(favicon(path.join(__dirname, "public/media", "bell.png")));

mongoose.set("useFindAndModify", false);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  async function(err) {
    console.log("mongoDB connected ?", err ? false : true);
    // Seed the DB.
    require("./utils/seed");
    // const authService = require('./src/auth/authService');
    // const token = await authService.loginMentor('prashant.abhishek7g@gmail.com', 'qwerty123');
    // console.log(token, 'result of authService call');
  }
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", authMiddleware.verifyMentor, studentsRouter);
app.use("/api/v1/payments", authMiddleware.verifyMentor, paymentsRouter);
app.use("/api/v1/reminders", authMiddleware.verifyMentor, remindersRouter);
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
