const mentorsDAL = require("./mentors-DAL");

const mentorsService = {
  findOneByField: async function(fieldNameObj) {
    return await mentorsDAL.findOneByField(fieldNameObj);
  }
};

module.exports = mentorsService;
