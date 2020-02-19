const remindersDAL = require("./reminders-DAL");

const paymentsService = {
  listReminders: async function() {
    return await remindersDAL.listReminders();
  },

  showReminder: async function(reminderId) {
    return await remindersDAL.showReminder(reminderId);
  },

  createReminder: async function(reminder) {
    return await remindersDAL.createReminder(reminder);
  },

  updateReminder: async function(reminderId, reminder) {
    return await remindersDAL.updatePayment(reminderId, reminder);
  },

  deleteReminder: async function(reminderId) {
    return await remindersDAL.deleteReminder(reminderId);
  }
};

module.exports = paymentsService;
