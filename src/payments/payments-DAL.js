const Payment = require("../../models/payment");

const paymentsDAL = {
  listPayments: async function() {
    return await Payment.find({});
  },

  showPayment: async function(paymentId) {
    return await Payment.findOne({ _id: paymentId });
  },

  createPayment: async function(payment) {
    return await Payment.create(payment);
  },

  updatePayment: async function(paymentId, payment) {
    return await Payment.findByIdAndUpdate(paymentId, payment, { new: true });
  },

  deletePayment: async function(paymentId) {
    return await Payment.remove({ _id: paymentId });
  }
};

module.exports = paymentsDAL;
