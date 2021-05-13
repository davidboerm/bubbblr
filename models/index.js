const User = require('./User');
const Chat = require('./Chat');
const Role = require('./Role');
const Tag = require('./Tag');

Chat.hasMany(User, {
  foreignKey: 'user_id',
});

Tag.belongsTo(Chat, {
    foreignKey: 'chat_id',
});

Role.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Chat, Role, Tag };