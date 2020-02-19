const Student = require("../../models/student");

const studentsDAL = {
  listStudents: async function() {
    return await Student.find({});
  },

  showStudent: async function(studentId) {
    return await Student.findOne({ _id: studentId });
  },

  createStudent: async function(student) {
    return await Student.create(student);
  },

  updateStudent: async function(studentId, student) {
    return await Student.findByIdAndUpdate(studentId, student, { new: true });
  },

  deleteStudent: async function(studentId) {
    return await Student.remove({ _id: studentId });
  }
};

module.exports = studentsDAL;
