var request = require("request");
var number_generator = require("./number_generator");

module.exports = function() {
  var generated = number_generator();
  request.post(
    {
      url: process.env.VALIDATE_URI,
      json: { generated }
    },
    (err, res, body) => {
      if (res.statusCode === 500) {
        regenerateAndSend(body);
      }
    }
  );
};

function regenerateAndSend(item) {
  var newGen = item.time;
  while (newGen.content === item.content) {
    newGen = number_generator();
  }

  request.post(
    {
      url: process.env.VALIDATE_URI,
      json: { newGen }
    },
    (err, res, body) => {}
  );
}
