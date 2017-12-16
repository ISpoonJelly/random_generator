var amqp = require("../amqp/amqp_handler");
var config = require("../amqp/amqp.config");

var message_controller = require("../server/controllers/message_controller");

var channel = null;

var MSG_Q_THRESHOLD = 10;
var msg_queue = [];

function work() {
  updateChannel();

  try {
    channel.consume(config.channel, processMessage);
    console.log("[worker]", "consuming...");
  } catch (err) {
    console.log("[AMQP]", "consume error", err.message);
    setTimeout(work, 5000);
  }
}

function processMessage(msg) {
  if (!msg) {
    return;
  }

  var parsed = JSON.parse(msg.content.toString());
  msg_queue.push(parsed);
  channel.ack(msg);

  if (msg_queue.length >= MSG_Q_THRESHOLD) {
    message_controller.create(msg_queue, (err, items) => {
      if (err) {
        console.log("create error!", err);
        msg_queue = msg_queue.concat(items);
      }
    });
    msg_queue = [];
  }
}

updateChannel = function() {
  channel = amqp.getChannel();
  if (!channel) {
    console.log("Channel error.");
    setTimeout(updateChannel, 5000);
  }
};

module.exports = work;
