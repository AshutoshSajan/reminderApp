const paymentsDAL = require("./payments-DAL");

const paymentsService = {
  listPayments: async function() {
    return await paymentsDAL.listPayments();
  },

  showPayment: async function(paymentId) {
    return await paymentsDAL.showPayment(paymentId);
  },

  createPayment: async function(payment) {
    return await paymentsDAL.createPayment(payment);
  },

  updatePayment: async function(paymentId, payment) {
    return await paymentsDAL.updatePayment(paymentId, payment);
  },

  deletePayment: async function(paymentId) {
    return await paymentsDAL.deletePayment(paymentId);
  }
};

module.exports = paymentsService;
