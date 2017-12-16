var message_controller = require("../controllers/message_controller");

module.exports = app => {
  app.get("/api/average", message_controller.get);
};
