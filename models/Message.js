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
		// name: { //omit
		//   type: DataTypes.STRING,
		//   allowNull: false,
		// },
		chat_text: {
			type: DataTypes.STRING
		},
		// date_created: { //omit
		//   type: DataTypes.DATE,
		//   allowNull: false,
		//   defaultValue: DataTypes.NOW,
		// },
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		tag_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'tag',
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
