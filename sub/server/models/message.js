"use strict";
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define(
    "Message",
    {
      content: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {}
      }
    }
  );
  return message;
};
