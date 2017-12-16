module.exports = function(date) {
  var time = date || Date.now();
  var content = getRandomInteger(1, 10000);

  return {
    time,
    content
  };
};

function getRandomInteger(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
  );
}
