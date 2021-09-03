const { DataTypes } = require('sequelize') //for checking datatypes
const sequelize = require('../db')//for connecting to our database

module.exports = Dog = sequelize.define('dog', {
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
    temperament: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_female: {
        type: DataTypes.BOOLEAN,
        allowNUll: false
    }
}
    
)


