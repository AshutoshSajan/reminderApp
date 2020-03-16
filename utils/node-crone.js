const cron = require("node-cron");
const Student = require("../models/Student");
const mailer = require("../utils/nodemailer-service");
const chalk = require("chalk");

// cron job running on 1st and 5th of every month
module.exports = cron.schedule("0 12 1,5,10 1-12 *", () => {
  console.log(chalk.blue.bold("cron job active..."));

  Student.find({}, (err, students) => {
    if (err) {
      console.log("\n", chalk.red.bold(err), "\n");
    }
    if (students.length) {
      sendPaymentReminder(students);
    }
  });
});

// send email notification to all the students
function sendPaymentReminder(students) {
  students.forEach(student => {
    console.log(student, "students inside cron-job send sendPaymentReminder");
    mailer.sendMail(student.email, student._id);
  });
}
