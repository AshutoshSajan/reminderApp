const Mentor = require("../../models/mentor");

const mentorsDAL = {
  findOneByField: async function(fieldNameObj) {
    return await Mentor.findOne(fieldNameObj);
  }
};

module.exports = mentorsDAL;
