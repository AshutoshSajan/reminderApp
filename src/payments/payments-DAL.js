const Payment = require('../../models/Payment');

const paymentsDAL = {
  async listPayments() {
    return Payment.find({});
  },

  async showPayment(paymentId) {
    return Payment.findOne({ _id: paymentId });
  },

  async createPayment(payment) {
    return Payment.create(payment);
  },

  async updatePayment(paymentId, payment) {
    return Payment.findByIdAndUpdate(paymentId, payment, { new: true });
  },

  async deletePayment(paymentId) {
    return Payment.remove({ _id: paymentId });
  },
};

module.exports = paymentsDAL;
