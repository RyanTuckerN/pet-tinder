// USER TABLE MODEL GOES HERE!
const { DataTypes } = require('sequelize')
const sequelize = require('../db')

module.exports = User = sequelize.define("user", {});
