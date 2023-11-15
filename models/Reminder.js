const mongoose = require('mongoose');

const { Schema } = mongoose;

const monthsEnum = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const reminderModeEnum = ['call', 'sms', 'email'];

const reminderSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    amount: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
    },
    mode: {
      type: String,
      enum: reminderModeEnum,
    },
    month: {
      type: String,
      enum: monthsEnum,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Reminder', reminderSchema);
