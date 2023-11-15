const Mentor = require('../../models/Mentor');

const mentorsDAL = {
  async findOneByField(fieldNameObj) {
    return Mentor.findOne(fieldNameObj);
  },
};

module.exports = mentorsDAL;
