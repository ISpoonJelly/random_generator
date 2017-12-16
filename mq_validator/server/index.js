var validating_controller = require("./validating_controller");

module.exports = app => {
  app.post("/validate", validating_controller.validate);

  setInterval(cleanWorker, 5 * 1000);
};

function cleanWorker() {
  validating_controller.clean();
}