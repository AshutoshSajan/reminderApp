const Reminder = require("../../models/Reminder");

const remindersDAL = {
  listReminders: async function() {
    return await Reminder.find({});
  },

  showReminder: async function(reminderId) {
    return await Reminder.findOne({ _id: reminderId });
  },

  createReminder: async function(reminder) {
    return await Reminder.create(reminder);
  },

  updateReminder: async function(reminderId, reminder) {
    return await Reminder.findByIdAndUpdate(reminderId, reminder, {
      new: true
    });
  },

  deleteReminder: async function(reminderId) {
    return await Reminder.remove({ _id: reminderId });
  }
};

module.exports = remindersDAL;
