/* eslint-disable global-require */
const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    const { host } = conn.connection;
    const message = `MongoDB Connected at host: ${host}...`;

    console.info(`\n${chalk.blue.bold(message)}\n`);

    require('../utils/seed');
  } catch (err) {
    const errMessage = chalk.red.bold(
      `MongoDB connection error ==>\n${err.message}`,
    );

    console.log(`\n${errMessage}\n`);

    process.exit(1);
  }
};

module.exports = connectDB;
