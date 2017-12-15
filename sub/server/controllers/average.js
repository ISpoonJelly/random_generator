var Average = require("../models").Average;

function create(req, res) {
  return Average.create({
    value: req.body.value
  })
    .then(average => res.status(200).send(average))
    .catch(err => res.status(500).send(err));
}

function getLast(req, res) {
  return Average.findOne({
    order: [[ 'createdAt', 'DESC' ]]
  })
    .then(averages => res.status(200).send(averages))
    .catch(err => res.status(500).send(err));
}

module.exports = {
  create,
  get_last: getLast
};
