// DOG TABLE MODEL GOES HERE!
const { DataTypes} = require('sequelize')//bringing in the DataTypes from the sequelize files so that when we type we can select from a pre-selected list of data types
const sequelize = require('../db')//this is where we connect to the local database

module.exports = User = sequelize.define( 'dog', {
    photo_url: {
        type: DataTypes.STRING(2048),
        allowNull: false,
    },
    dog_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ad_description: {
        DataTypes.STRING(500),
        allowNull: false
    },
    is_female: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    temperament: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    owner: {
        type: DataTypes.INTEGER //thinking of this because in the NODE SERVER project, this was used for the owner in the journal.js folder
    }
} 
);
