var amqp = require("./amqp_handler");
var number_generator = require("./number_generator");

amqp.init();
setInterval(() => {
  var msg = number_generator();
  amqp.send_message(msg);
}, 100);
