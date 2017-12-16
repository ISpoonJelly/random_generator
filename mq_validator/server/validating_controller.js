var amqp = require('../amqp/amqp_handler');

var items = [];

function validate(req, res) {
  var generated = req.body.generated;
  if (!generated) {
    return;
  }

  var matched_items = [];
  for (var item of items) {
    if (Math.abs(item.time - generated.time) <= 50) {
      matched_items.push(items.indexOf(item));

      if (item.content === generated.content) {
        return res.status(500).send(generated);
      }
    }
  }
  items.push(generated);

  amqp.sendMessage(generated);
  return res.status(200).send({});
}

function clean() {
  var current = Date.now();

  for (var item of items) {
    if (item.time + 10 * 1000 <= current) {
      items.splice(items.indexOf(item), 1);
    }
  }
}

module.exports = {
  validate,
  clean
};
