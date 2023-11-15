const remindersDAL = require('./reminders-DAL');

const paymentsService = {
  async listReminders() {
    return remindersDAL.listReminders();
  },

  async showReminder(reminderId) {
    return remindersDAL.showReminder(reminderId);
  },

  async createReminder(reminder) {
    return remindersDAL.createReminder(reminder);
  },

  async updateReminder(reminderId, reminder) {
    return remindersDAL.updateReminder(reminderId, reminder);
  },

  async deleteReminder(reminderId) {
    return remindersDAL.deleteReminder(reminderId);
  },
};

module.exports = paymentsService;
