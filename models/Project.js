const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING
		},
		message_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'message',
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

module.exports = Project;