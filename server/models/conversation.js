const sequelize = require('../db');
const { Sequelize } = sequelize;
const { Op } = Sequelize;

const Conversation = sequelize.define('conversation', {

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
    include: [ sequelize.models.message ],
    order: [[ sequelize.models.message, 'createdAt', 'ASC' ]]
  })
    .then(conversation => {
      if(conversation) {
        // console.log(conversation.messages.map(m=>m.dataValues))
        // console.log('📑 sent the coversation', conversation.messages.map(m=>m.id))  
        return conversation;
      } else {
         console.log('✏✏✏📑 creating new conversation!')  
        return Conversation.create({
          user1Id,
          user2Id
        }, {
          include: [ sequelize.models.message ],
          order: [[ sequelize.models.message, 'createdAt', 'DESC' ]]
        });
      }
    });
};

module.exports = Conversation;