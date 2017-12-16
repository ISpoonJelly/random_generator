var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");

var amqp = require('./amqp/amqp_handler');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./server/routes')(app);
amqp.init();

if (!module.parent) {
  var server = http.createServer(app);

  var PORT = process.env.PORT || 3000;
  server.listen(PORT);

  server.on("listening", () => {
    var addr = server.address();
    console.log("[HTTP]", "Server is running, listening on port ", addr.port);
  });

  server.on("error", err => {
    console.log("[HTTP] %s", err);
    process.exit();
  });
}

module.exports = app;
