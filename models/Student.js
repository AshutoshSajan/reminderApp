const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    isAlumni: {
      type: Boolean,
      default: false,
    },
    isStayingInCampus: {
      type: Boolean,
      default: false,
    },
    numAnnualSalary: {
      type: Number,
    },
    numPercentageToBeCharged: {
      type: Number,
    },
    numMinAmtToBePaid: {
      type: Number,
    },
    hasPaidEntireTrainingFee: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Student', studentSchema);
