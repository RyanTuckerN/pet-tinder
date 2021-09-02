const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: DataTypes.JSON,
  }
});