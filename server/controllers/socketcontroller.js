const { User, Conversation, Message, Dog } = require("../models");
const sequelize = require('../db')
const mobileSockets = {};



module.exports = (socket) => {
  // console.log(socket)
  console.log("A user connected! 🤸🤸🤸");
  //***LOGIN EVENT***//
  socket.on("newLogin", (credentials) => {
     
    console.log('🛂🛂🛂 CREDENTIALS: ',credentials);
    //change to userJoined?
    const { profile_name, id } = credentials;
    Promise.all([
      User.findOne({ where: { profile_name }, include: {model : Dog} }),
      // User.findAll() //change this to only find matches
      sequelize.models.like.getMatches(id),
    ])
      .then(([user, matches]) => {
        console.log('USER: ', user.dataValues, 'Matches: ', matches.map(m=>{return {name: m.dataValues.name, id: m.dataValues.id}}))
        mobileSockets[user.id] = socket.id;
        socket.emit("userCreated", {
          user, matches
          // users: users.filter((u) => u.id !== user.id), //only show users that aren't 'this' user
        });
        socket.emit("newUser", {mobileSockets});
        console.log("SOCKET USERS ONLINE: ", mobileSockets);
      })
      .catch((err) => console.log(err));
  });

  //***CHAT EVENT***//
  socket.on("chat", (users) => {
    Conversation.findOrCreateConversation(
      users.sender.id,
      users.receiver.id
    ).then((conversation) => {
         
      console.log(`🔸🔸🔸 Current conversation between user ${conversation.dataValues.user1Id} and user ${conversation.dataValues.user2Id}. 🔸🔸🔸`)
      console.log('Sending Conversation 🚚🚚🚚') 
      socket.emit("priorMessages", conversation);
    });
  });

  // socket.on("newMessage", (res) => console.log(res));
  //***MESSAGE EVENT***//
  socket.on("message", ({ text, sender, receiver }) => {
    Message.createMessage(text, sender, receiver).then((message) => {
      Conversation.findOrCreateConversation(sender.id, receiver.id).then(conversation=>{
        socket.emit("incomingMessage", {message, conversation}); //send the message back to the sender
        const receiverSocketId = mobileSockets[receiver.id];
        socket.to(receiverSocketId).emit("incomingMessage", {message, conversation}); //send the message to the other user if they are online? maybe?
      })
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected🚪🚪🚪");
  });
}