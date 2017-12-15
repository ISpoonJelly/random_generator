var averageController = require("../controllers/average");

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to avg api"
    })
  );

  app.post("/api/average", averageController.create);
  app.get("/api/average", averageController.get_last);
};
