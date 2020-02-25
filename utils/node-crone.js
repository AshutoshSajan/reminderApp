const cron = require("node-cron");

module.exports = cron.schedule("0 12 1,7 1-12 *", () => {
  console.log("running twice on every month");
});
