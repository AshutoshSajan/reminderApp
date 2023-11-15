const Mentor = require('../models/Mentor');

Mentor.find({}).exec(async (err, mentors) => {
  try {
    if (err) {
      console.log(err, 'seed mentor err!');

      throw new Error('unable to find the mentors!');
    }

    if (!mentors.length) {
      const admin = new Mentor({
        name: process.env.NAME,
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      });

      await admin.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error('unable to seed the mentor!');
  }
});
