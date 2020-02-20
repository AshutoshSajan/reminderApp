const express = require("express");
const router = express.Router();

const validatorMiddleware = require("../utils/validator-middleware");
const remindersController = require("../controllers/reminders");

router.get("/", remindersController.listReminders);

router.post(
  "/",
  validatorMiddleware.mustHaveFields(["amount"], "reminder"),
  remindersController.createReminder
);

router.get("/:id", remindersController.showReminder);

router.put(
  "/:id",
  validatorMiddleware.mustHaveFields(["amount"], "reminder"),
  remindersController.updateReminder
);

router.delete("/:id", remindersController.deleteReminder);

// send reminder mail test route
//
// router.post(
//   "/send-mail/:id",
//   (req, res, next) => {
//     console.log("reminders router");
//     next();
//   },
//   remindersController.sendReminder
// );

module.exports = router;
