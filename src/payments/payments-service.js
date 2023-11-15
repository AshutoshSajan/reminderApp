const paymentsDAL = require('./payments-DAL');

const paymentsService = {
  async listPayments() {
    return paymentsDAL.listPayments();
  },

  async showPayment(paymentId) {
    return paymentsDAL.showPayment(paymentId);
  },

  async createPayment(payment) {
    return paymentsDAL.createPayment(payment);
  },

  async updatePayment(paymentId, payment) {
    return paymentsDAL.updatePayment(paymentId, payment);
  },

  async deletePayment(paymentId) {
    return paymentsDAL.deletePayment(paymentId);
  },
};

module.exports = paymentsService;
