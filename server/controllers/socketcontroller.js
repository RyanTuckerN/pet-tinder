const { User, Conversation, Message, Dog } = require("../models");
const sequelize = require("../db");
const mobileSockets = {};

module.exports = (socket) => {
  //***LOGIN EVENT***//
  socket.on("newLogin", (id) => {
    console.log("ON CONNECTION: ", mobileSockets);
    console.log("🛂🛂🛂 CREDENTIALS: ", id);
    Promise.all([
      User.findOne({ where: { id }, include: { model: Dog } }),
      sequelize.models.like.getMatches(id),
    ])
      .then(([user, matches]) => {
        mobileSockets[user.id] = socket.id;
        socket.emit("userCreated", {
          user,
          matches,
        });
        socket.emit("newUser", { mobileSockets });
        socket.broadcast.emit("newUser", { mobileSockets });
        

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
      console.log(
        `🔸🔸🔸 Current conversation between user ${conversation.dataValues.user1Id} and user ${conversation.dataValues.user2Id}. 🔸🔸🔸`
      );
      console.log("Sending Conversation 🚚🚚🚚");
      socket.emit("priorMessages", conversation);
    });
  });

  socket.on("matchRequest", (id) => {
    console.log("ON MATCH REQUEST: ", mobileSockets);
    console.log("🛂 CREDENTIALS: ", id);
    Promise.all([
      User.findOne({ where: { id }, include: { model: Dog } }),
      sequelize.models.like.getMatches(id),
    ])
      .then(([user, matches]) => {
        mobileSockets[user.id] = socket.id;
        socket.emit("userCreated", {
          user,
          matches,
        });
        socket.emit("newUser", { mobileSockets });
        socket.broadcast.emit("newUser", { mobileSockets });
        socket.broadcast.emit('matchUpdate', {message: 'update your matches'})

        console.log("SOCKET USERS ONLINE: ", mobileSockets);
      })
      .catch((err) => console.log(err));
  });

  //***MESSAGE EVENT***//
  socket.on("message", ({ text, sender, receiver }) => {
    Message.createMessage(text, sender, receiver).then((message) => {
      Conversation.findOrCreateConversation(sender.id, receiver.id).then(
        (conversation) => {
          socket.emit("incomingMessage", { message, conversation }); //send the message back to the sender
          const receiverSocketId = mobileSockets[receiver.id];
          socket
            .to(receiverSocketId)
            .emit("incomingMessage", { message, conversation }); //send the message to the other user if they are online? maybe?
        }
      );
    });
  });

  socket.on("socketUpdate", () => {
    socket.emit("newUser", { mobileSockets });
    socket.broadcast.emit("newUser", { mobileSockets });
  });
  socket.on("disconnect", () => {
    const getKeyByValue = (object, value) => {
      return Object.keys(object).find((key) => object[key] === value);
    };
    delete mobileSockets[getKeyByValue(mobileSockets, socket.id)];
    socket.emit("newUser", { mobileSockets });
    socket.broadcast.emit("newUser", { mobileSockets });
  });
};
