const Mentor = require("../models/mentor");

Mentor.find({}).exec((err, mentors) => {
  if (!mentors.length) {
    const admin = new Mentor({
      name: process.env.NAME,
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    });

    admin.save();
  }
});
