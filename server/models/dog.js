// DOG TABLE MODEL GOES HERE!rts = User = sequelize.define(
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

