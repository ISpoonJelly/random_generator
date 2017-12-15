"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

var sequelize;
if (config.use_env_variable) {
  var input = process.env[config.use_env_variable];
  var split = input.split("@");

  var userpw = split[0].split("//")[1].split(":");
  var username = userpw[0];
  var password = userpw[1];

  split = split[1].split(":");
  var host = split[0];

  split = split[1].split("/");
  var port = split[0];
  var database = split[1];

  sequelize = new Sequelize({
    host,
    username,
    password,
    port,
    database,
    dialect: "postgres"
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
