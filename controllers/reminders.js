const remindersService = require("../src/reminders/reminders-service");
const nodemailer = require("../utils/nodemailer-service");

const remindersController = {
  listReminders: async function(req, res) {
    try {
      const reminders = await remindersService.listReminders();
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        reminders
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  createReminder: async function(req, res) {
    const reminder = req.body.reminder;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        reminder: await remindersService.createReminder(reminder)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  showReminder: async function(req, res) {
    const reminderId = req.params.id;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        reminder: await remindersService.showReminder(reminderId)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  updateReminder: async function(req, res) {
    const reminderId = req.params.id;
    const reminder = req.body.reminder;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        reminder: await remindersService.updateReminder(reminderId, reminder)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  deleteReminder: async function(req, res) {
    const reminderId = req.params.id;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        reminder: await remindersService.deleteReminder(reminderId)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  sendReminder: async (req, res) => {
    const { email } = req.body;
    const userId = req.params.id;

    console.log(
      // req,
      "req...........",
      req.body,
      email,
      "email",
      userId,
      "userId",
      "send reminder controller..."
    );

    try {
      const mailRes = await nodemailer.sendMail(email, userId);
      return res
        .status(200)
        .json({ success: true, message: "request sucessfull", mailRes });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  }
};

module.exports = remindersController;
