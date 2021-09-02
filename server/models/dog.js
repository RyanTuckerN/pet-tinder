// DOG TABLE MODEL GOES HERE!
const {DataTypes} = require('sequelize') //for checking datatypes
const sequelize = require('../db')//for connecting to our database

module.exports = Dog = sequelize.define('dog', {
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