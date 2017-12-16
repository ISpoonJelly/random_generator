var models = require("../models");
var Message = models.Message;
var Op = models.Sequelize.Op;

function create(items, cb) {
  return Message.bulkCreate(items)
    .then(message => cb(undefined, message))
    .catch(err => cb(err, items));
}

function get(req, res) {
  var currentDate = new Date();
  return Message.findAll({
    where: {
      time: {
        [Op.lt]: currentDate,
        [Op.gt]: new Date(currentDate - 5 * 1000)
      }
    },
    order: [["time", "ASC"]]
  })
    .then(messages => res.status(200).send(processMessages(messages)))
    .catch(err => res.status(500).send(err));
}

function processMessages(messages) {
  var start_time = formatDate(messages[0].time);
  var end_time = formatDate(messages[messages.length - 1].time);

  var sum = 0;
  for (var msg of messages) {
    sum += msg.content;
  }
  var average = sum / messages.length;

  return { start_time, end_time, average };
}

function formatDate(date) {
  return date
    .toISOString()
    .substring(0, 23)
    .replace("T", " ");
}

module.exports = {
  create,
  get
};
