const mentorsDAL = require('./mentors-DAL');

const mentorsService = {
  async findOneByField(fieldNameObj) {
    return mentorsDAL.findOneByField(fieldNameObj);
  },
};

module.exports = mentorsService;
