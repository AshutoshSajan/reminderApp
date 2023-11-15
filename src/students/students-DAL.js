const Student = require('../../models/Student');

const studentsDAL = {
  async listStudents() {
    return Student.find({});
  },

  async showStudent(studentId) {
    return Student.findOne({ _id: studentId });
  },

  async createStudent(student) {
    return Student.create(student);
  },

  async updateStudent(studentId, student) {
    return Student.findByIdAndUpdate(studentId, student, { new: true });
  },

  async deleteStudent(studentId) {
    return Student.remove({ _id: studentId });
  },
};

module.exports = studentsDAL;
