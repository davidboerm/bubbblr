const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Message.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		chat_text: {
			type: DataTypes.STRING
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		isSelected: {
			type: DataTypes.BOOLEAN,
		},
		tag_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'tag',
				key: 'id'
			}
		},
		project_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'project',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'message'
	}
);

module.exports = Message;