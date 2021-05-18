const User = require('./User');
const Chat = require('./Chat');
const Role = require('./Role');
const Tag = require('./Tag');

Chat.hasOne(User, {
  foreignKey: 'user_id',
});

User.hasMany(Chat, {
  foreignKey: 'user_id',
});

Chat.hasOne(Tag, {
  foreignKey: 'chat_id',
});

Tag.hasMany(Chat, {
    foreignKey: 'chat_id',
});

Role.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasOne(Role, {
  foreignKey: 'user_id',
});

module.exports = { User, Chat, Role, Tag };