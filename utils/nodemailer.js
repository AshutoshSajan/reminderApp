"use strict";
const nodemailer = require("nodemailer");
const mailMessage = require("../utils/mail");

mailMessage(userId);

const message = userId =>
  `<div>
        <h2>Monthly Payment Reminder</h2>
        <p>Plese make your payments as soon as possible<p>
        <a
            href='http://localhost:3000/students/${userId}/send-payment-details'
            target='_blank'
        >
            Send Payment Details
        </a>
    </div>`;

// async..await is not allowed in global scope, must use a wrapper
exports.mail = async function(email, userId, html) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_EMAIL, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    }
  });

  console.log(
    "inside nodemailer file",
    process.env.EMAIL,
    "process.env.EMAIL",
    process.env.PASSWORD,
    "process.env.PASSWORD"
  );

  mailMessage(userId);
  message(userId);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Altcampus<${process.env.MAIL_EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Paymennt Reminder", // Subject line
    text: "If you have already paid your expenses then ignore this message", // plain text body
    // html: html ? html : `${message}; ` // html body
    html: html ? html : `${mailMessage}; ` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
