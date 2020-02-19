const studentsDAL = require("./students-DAL");

const studentsService = {
  listStudents: async function() {
    return await studentsDAL.listStudents();
  },

  showStudent: async function(studentId) {
    return await studentsDAL.showStudent(studentId);
  },

  createStudent: async function(student) {
    return await studentsDAL.createStudent(student);
  },

  updateStudent: async function(studentId, student) {
    return await studentsDAL.updateStudent(studentId, student);
  },

  deleteStudent: async function(studentId) {
    return await studentsDAL.deleteStudent(studentId);
  }
};

module.exports = studentsService;
