var amqp = require("./amqp/amqp_handler");
var number_generator = require("./util/number_generator");

amqp.init();
setInterval(() => {
  var msg = number_generator();
  amqp.send_message(msg);
}, 100);
