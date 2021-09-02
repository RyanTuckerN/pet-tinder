const { DataTypes} = require('sequelize')//bringing in the DataTypes from the sequelize files so that when we type we can select from a pre-selected list of data types
const sequelize = require('../db')//this is where we connect to the local database

module.exports = (sequelize, DataTypes) => {
    const Dog = sequelize.define('dog', {
        photo_url: {
            type: DataTypes.STRING(2048),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ad_description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

    })
    return Dog;
}