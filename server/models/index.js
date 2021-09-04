const User = require("./user");
const Dog = require("./dog");
const Like = require("./like");

Dog.belongsTo(User)
User.hasOne(Dog)

Like.belongsTo(User)
User.hasMany(Like)

module.exports = {
  User,
  Dog,
  Like,
};
