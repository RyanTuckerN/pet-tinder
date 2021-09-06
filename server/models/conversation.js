const conn = require('../db');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define('conversation', {

});

Conversation.findOrCreateConversation = function(user1Id, user2Id) {
  // console.log(user1Id, user2Id)
  return Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    },
    include: [ conn.models.message ],
    order: [[ conn.models.message, 'createdAt', 'DESC' ]]
  })
    .then(conversation => {
      if(conversation) {
        // console.log(conversation.messages.map(m=>m.dataValues))
        console.log('📑 sent the coversation')  
        return conversation;
      } else {
         console.log('✏✏✏📑 creating new conversation!')  
        return Conversation.create({
          user1Id,
          user2Id
        }, {
          include: [ conn.models.message ],
          order: [[ conn.models.message, 'createdAt', 'DESC' ]]
        });
      }
    });
};

module.exports = Conversation;