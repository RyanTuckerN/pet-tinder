const User = require("./user");
const Dog = require("./dog");
// const Like = require("./like");

User.hasMany(Like)
Like.belongsTo(User)

module.exports = {
  User,
  Dog,
  // Like,
};
