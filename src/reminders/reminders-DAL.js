const Reminder = require('../../models/Reminder');

const remindersDAL = {
  async listReminders() {
    return Reminder.find({});
  },

  async showReminder(reminderId) {
    return Reminder.findOne({ _id: reminderId });
  },

  async createReminder(reminder) {
    return Reminder.create(reminder);
  },

  async updateReminder(reminderId, reminder) {
    return Reminder.findByIdAndUpdate(reminderId, reminder, {
      new: true,
    });
  },

  async deleteReminder(reminderId) {
    return Reminder.remove({ _id: reminderId });
  },
};

module.exports = remindersDAL;
