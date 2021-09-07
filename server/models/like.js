const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Like = sequelize.define(
  "like",
  {
    //SAVE PK of target user Liked along with PK of 'this' user
    liked_dog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    superlike: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // owner_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });

module.exports = Like