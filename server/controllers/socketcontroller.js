const { User, Conversation, Message, Like } = require("../models");
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
      User.findOne({ where: { profile_name } }),
      // User.findAll() //change this to only find matches
      sequelize.models.like.getMatches(id),
    ])
      .then(([user, matches]) => {
        // console.log('USER: ', user, 'Matches: ', users)
        mobileSockets[user.id] = socket.id;
        socket.emit("userCreated", {
          user, matches
          // users: users.filter((u) => u.id !== user.id), //only show users that aren't 'this' user
        });
        socket.broadcast.emit("newUser");
        console.log(mobileSockets);
      })
      .catch((err) => console.log(err));
  });

  //***CHAT EVENT***//
  socket.on("chat", (users) => {
    Conversation.findOrCreateConversation(
      users.sender.id,
      users.receiver.id
    ).then((conversation) => {
       
      console.log('🔥🔥🔥🔥🔥', conversation) 
      socket.emit("priorMessages", conversation);
    });
  });

  // socket.on("newMessage", (res) => console.log(res));
  //***MESSAGE EVENT***//
  socket.on("message", ({ text, sender, receiver }) => {
    Message.createMessage(text, sender, receiver).then((message) => {
      socket.emit("incomingMessage", message); //send the message back to the sender
      const receiverSocketId = mobileSockets[receiver.id];
      socket.to(receiverSocketId).emit("incomingMessage", message); //send the message to the other user if they are online? maybe?
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected🚪🚪🚪");
  });
}