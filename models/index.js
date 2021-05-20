const User = require('./User');
const Message = require('./Message');
const Role = require('./Role');
const Tag = require('./Tag');
const Project = require('./Project')

Message.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

User.hasMany(Message, {
	foreignKey: 'user_id'
});

Message.belongsTo(Tag, {
	foreignKey: 'tag_id'
});

Tag.hasMany(Message, {
	foreignKey: 'tag_id',
	onDelete: 'CASCADE'
});

Role.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

User.hasOne(Role, {
	foreignKey: 'user_id'
});

Project.hasMany(Message,{
	foreignKey: 'message_id'
});

Message.belongsTo(Project, {
	foreignKey: 'message_id'
});

module.exports = { User, Message, Role, Tag, Project };
