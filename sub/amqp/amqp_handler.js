var amqp = require("amqplib/callback_api");

var config = require("./amqp.config");
var worker = require("../workers/average_worker");

var channel;

function init() {
  amqp.connect(config.AMQP_HOST + "?heartbeat=60", function(err, conn) {
    if (err) {
      console.log("[AMQP]", "error connecting to AMQP server. reconnecting...");
      return setTimeout(init, 3500);
    }

    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.log("[AMQP]", "conn error", err.message);
      }
    });

    conn.on("close", function() {
      console.log("[AMQP]", "connection closed. reconnecting...");
      return setTimeout(init, 3500);
    });

    conn.createChannel(function(err, ch) {
      if (err) {
        console.log("[AMQP]", "error creating channel with AMQP server");
      }

      console.log("[AMQP]", "sucessfully connected to AMQP server.");
      channel = ch;
      channel.assertQueue(config.QUEUE_NAME, { durable: false });

      worker();
    });
  });
}

function getChannel() {
  return channel;
}

module.exports.init = init;
module.exports.getChannel = getChannel;
