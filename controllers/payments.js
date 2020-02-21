const paymentsService = require("../src/payments/payments-service");

const paymentsController = {
  listPayments: async function(req, res, next) {
    try {
      const payments = await paymentsService.listPayments();
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        payments
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  createPayment: async function(req, res, next) {
    const payment = req.body.payment;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        payment: await paymentsService.createPayment(payment)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  showPayment: async function(req, res, next) {
    const paymentId = req.params.id;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        payment: await paymentsService.showPayment(paymentId)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  updatePayment: async function(req, res, next) {
    const paymentId = req.params.id;
    const payment = req.body.payment;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        payment: await paymentsService.updatePayment(paymentId, payment)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  },

  deletePayment: async function(req, res, next) {
    const paymentId = req.params.id;
    try {
      return res.status(200).json({
        success: true,
        message: "request sucessfull",
        payment: await paymentsService.deletePayment(paymentId)
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error, message: "server error" });
    }
  }
};

module.exports = paymentsController;
