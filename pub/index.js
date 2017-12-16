var generation_handler = require("./generator/generation_handler");

setInterval(() => {
  generation_handler();
}, 100);
