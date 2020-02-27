const Mentor = require("../../models/Mentor");

const mentorsDAL = {
  findOneByField: async function(fieldNameObj) {
    return await Mentor.findOne(fieldNameObj);
  }
};

module.exports = mentorsDAL;
