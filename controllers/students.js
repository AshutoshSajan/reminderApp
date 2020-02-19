const studentsService = require("../src/students/students-service");

const studentsController = {
  listStudents: async function(req, res, next) {
    try {
      const students = await studentsService.listStudents();
      return res.status(200).json({ success: true, message: "", students });
    } catch (error) {
      return res.json({ success: false, message: "server error", students });
    }
  },

  createStudent: async function(req, res, next) {
    try {
      const student = await studentsService.createStudent(req.body.student);
      return res.status(200).json({
        success: true,
        message: "student created",
        student
      });
    } catch (error) {
      return res.json({ success: false, error, message: "server error" });
    }
  },

  showStudent: async function(req, res, next) {
    const studentId = req.params.id;

    try {
      const student = await studentsService.showStudent(studentId);

      return res.status(200).json({
        success: true,
        message: "student found",
        student
      });
    } catch (error) {
      return res.json({ success: false, error, message: "server error" });
    }
  },

  updateStudent: async function(req, res, next) {
    const studentId = req.params.id;
    const student = req.body.student;

    try {
      const updateStudent = await studentsService.updateStudent(
        studentId,
        student
      );

      return res.status(200).json({
        success: true,
        message: "student updated",
        updateStudent
      });
    } catch (error) {
      return res.json({ success: false, error, message: "server error" });
    }
  },

  deleteStudent: async function(req, res, next) {
    const studentId = req.params.id;
    const student = await studentsService.deleteStudent(studentId);

    try {
      return res.status(200).json({
        success: true,
        message: "student updated",
        student
      });
    } catch (error) {
      return res.json({ success: false, error, message: "server error" });
    }
  }
};

module.exports = studentsController;
