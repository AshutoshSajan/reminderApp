const remindersService = require('../src/reminders/reminders-service');
const nodemailer = require('../utils/nodemailer-service');

const remindersController = {
  async listReminders(req, res) {
    try {
      const reminders = await remindersService.listReminders();

      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        reminders,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async createReminder(req, res) {
    const { reminder } = req.body;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        reminder: await remindersService.createReminder(reminder),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async showReminder(req, res) {
    const reminderId = req.params.id;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        reminder: await remindersService.showReminder(reminderId),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async updateReminder(req, res) {
    const reminderId = req.params.id;
    const { reminder } = req.body;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        reminder: await remindersService.updateReminder(reminderId, reminder),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async deleteReminder(req, res) {
    const reminderId = req.params.id;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        reminder: await remindersService.deleteReminder(reminderId),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  sendReminder: async (req, res) => {
    const { email } = req.body;
    const userId = req.params.id;

    try {
      const mailRes = await nodemailer.sendMail(email, userId);

      return res
        .status(200)
        .json({ success: true, message: 'request sucessfull', mailRes });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },
};

module.exports = remindersController;
