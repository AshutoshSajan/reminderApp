const nodemailer = require('nodemailer');
const mailMessage = require('./mail');

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (email, userId, html = null) => {
  // Generate test SMTP service account from ethereal.email

  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILING_EMAIL_ADDRESS, // generated ethereal user
      pass: process.env.MAILING_EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Altcampus`, // sender address
    to: `${email}`, // list of receivers
    subject: 'Paymennt Reminder', // Subject line
    text: 'If you have already paid your expenses then ignore this message', // plain text body
    // html: html ? html : `${message}; ` // html body
    html: html || `${mailMessage(userId)}; `, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
