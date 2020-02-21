const express = require("express");
const router = express.Router();

const validatorMiddleware = require("../utils/validator-middleware");
const paymentsController = require("../controllers/payments");

router.get("/", paymentsController.listPayments);

router.post(
  "/",
  validatorMiddleware.mustHaveFields(["amount"], "payment"),
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
