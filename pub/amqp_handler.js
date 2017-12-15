var amqp = require("amqplib/callback_api");
var config = require("./amqp.config");

let MAX_MSGS = 6000;

var channel;
var msgQueue = [];

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

      channel = ch;
      channel.assertQueue(config.QUEUE_NAME, { durable: false });
    });
  });
}

function startPublisher() {
  if(!channel) {
    return;
  }
  
  while (true) {
    var msg = msgQueue.shift();
    if (!msg) {
      break;
    }

    try {
      channel.sendToQueue(config.QUEUE_NAME, new Buffer(JSON.stringify(msg)));
    } catch (e) {
      console.log("caught exception while sending to q", e);
      msgQueue.push(msg);
    }
  }
}

function sendMessage(msg) {
  if (msgQueue.length <= MAX_MSGS) {
    msgQueue.push(msg);
  }
  startPublisher();
}

module.exports = {
  init,
  send_message: sendMessage
};
