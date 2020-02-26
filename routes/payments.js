const express = require("express");
const router = express.Router();

const validatorMiddleware = require("../utils/validator-middleware");
const paymentsController = require("../controllers/payments");

// to save files locally or on cloudinary
const upload = require("../utils/multer.config");

router.get("/", paymentsController.listPayments);

router.post(
  "/",
  // upload.single("screenshot"), // to save files locally
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
