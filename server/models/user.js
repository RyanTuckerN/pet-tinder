// USER TABLE MODEL GOES HERE!
const { DataTypes} = require('sequelize')//bringing in the DataTypes from the sequelize files so that when we type we can select from a pre-selected list of data types
const sequelize = require('../db')//this is where we connect to the local database

module.exports = User = sequelize.define( 'user', {
    profile_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    location: {
        type: DataTypes.JSON,
    }

}  
);





