const studentsService = require("../src/students/students-service");
const remindersService = require("../src/reminders/reminders-service");
const nodemailer = require("../utils/nodemailer-service");

const studentsController = {
  listStudents: async function(req, res) {
    try {
      const students = await studentsService.listStudents();
      return res.status(200).json({ success: true, message: "", students });
    } catch (error) {
      return res.json({ success: false, message: "server error", students });
    }
  },

  createStudent: async function(req, res) {
    try {
      const student = await studentsService.createStudent(req.body.student);

      // TODO: create reminder instance before sending the email

      // sending mail reminder after creating student
      nodemailer.sendMail(student.email, student._id);

      return res.status(200).json({
        success: true,
        message: "student created",
        student
      });
    } catch (error) {
      return res.json({ success: false, error, message: "server error" });
    }
  },

  showStudent: async function(req, res) {
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

  updateStudent: async function(req, res) {
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

  deleteStudent: async function(req, res) {
    const studentId = req.params.id;

    try {
      const student = await studentsService.deleteStudent(studentId);

      return res.status(200).json({
        success: true,
        message: "student deleted",
        student
      });
    } catch (error) {
      return res.json({ success: false, error, message: "server error" });
    }
  }
};

module.exports = studentsController;
