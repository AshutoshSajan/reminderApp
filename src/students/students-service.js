const studentsDAL = require('./students-DAL');

const studentsService = {
  async listStudents() {
    return studentsDAL.listStudents();
  },

  async showStudent(studentId) {
    return studentsDAL.showStudent(studentId);
  },

  async createStudent(student) {
    return studentsDAL.createStudent(student);
  },

  async updateStudent(studentId, student) {
    return studentsDAL.updateStudent(studentId, student);
  },

  async deleteStudent(studentId) {
    return studentsDAL.deleteStudent(studentId);
  },
};

module.exports = studentsService;
