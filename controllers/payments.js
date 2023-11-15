const paymentsService = require('../src/payments/payments-service');

const paymentsController = {
  async listPayments(req, res) {
    try {
      const payments = await paymentsService.listPayments();

      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        payments,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async createPayment(req, res) {
    const { payment } = req.body;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        payment: await paymentsService.createPayment(payment),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async showPayment(req, res) {
    const paymentId = req.params.id;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        payment: await paymentsService.showPayment(paymentId),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async updatePayment(req, res) {
    const paymentId = req.params.id;
    const { payment } = req.body;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        payment: await paymentsService.updatePayment(paymentId, payment),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },

  async deletePayment(req, res) {
    const paymentId = req.params.id;

    try {
      return res.status(200).json({
        success: true,
        message: 'request sucessfull',
        payment: await paymentsService.deletePayment(paymentId),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: 'server error' });
    }
  },
};

module.exports = paymentsController;
