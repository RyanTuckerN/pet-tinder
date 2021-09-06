const connection = require("../db");
const { DataTypes } = require("sequelize");

const Message = connection.define("message", {
  text: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }, 
  user: { 
    type: DataTypes.JSON 
  }
});
 
Message.createMessage = (text, sender, receiver) => {
  console.log(`🖥 Saving to database: ${text} from ${sender.username} to ${receiver.username}`)
  return Promise.all([
    Message.create({
      text,
      user: {
        _id: sender.id,
        name: sender.profile_name
      }
    }),
    connection.models.conversation.findOrCreateConversation(sender.id, receiver.id)
  ])
    .then(([message, conversation]) => message.setConversation(conversation));
};

module.exports = Message