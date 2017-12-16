module.exports = function () {
    var genNum = getRandomInteger(1, 10000);

    return {
        time: Date.now(),
        content: genNum
    }
}

function getRandomInteger(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
  );
}

