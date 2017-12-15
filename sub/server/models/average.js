'use strict';
module.exports = (sequelize, DataTypes) => {
  var Average = sequelize.define('Average', {
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Average;
};