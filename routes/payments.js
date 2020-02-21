const express = require("express");
const router = express.Router();

const validatorMiddleware = require("../utils/validator-middleware");
const paymentsController = require("../controllers/payments");

router.get("/", paymentsController.listPayments);

router.post(
  "/",
  (req, res, next) => {
    console.log(req.body, "create payment check1...............");
    next();
  },
  validatorMiddleware.mustHaveFields(["amount"], "payment"),
  (req, res, next) => {
    console.log(req.body, "create payment check2...............");
    next();
  },
  paymentsController.createPayment
);

router.get("/:id", paymentsController.showPayment);

router.put(
  "/:id",
  validatorMiddleware.mustHaveFields(["amount"], "payment"),
  paymentsController.updatePayment
);

router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
