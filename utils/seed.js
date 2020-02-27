const Mentor = require("../models/Mentor");

Mentor.find({}).exec((err, mentors) => {
  if (err) {
    console.log(err, "seed mentor err!");
    return res
      .status(500)
      .json({ err, success: false, message: "server error" });
  }
  if (!mentors.length) {
    const admin = new Mentor({
      name: process.env.NAME,
      email: process.env.EMAIL,
      password: process.env.PASSWORD
    });
    admin.save();
  }
});
