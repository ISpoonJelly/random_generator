module.exports = function () {
    var genNum = getRandomInteger(1, 1000);

    return {
        timestamp: Date.now(),
        msg: genNum
    }
}

function getRandomInteger(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
  );
}

