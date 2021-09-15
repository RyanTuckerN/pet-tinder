const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Sequelize } = sequelize;
const { Op } = Sequelize;

const Notification = sequelize.define("notification", {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  display: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Notification.clearNotifications = async (user_id) => {
  const usersNots = await Notification.findAll({ where: { userId: user_id } });
  usersNots.forEach((notification) => {
    Notification.update(
      {display: false},
      {where: notification.id}
      )
  });
};

module.exports = Notification