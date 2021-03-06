const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tag extends Model {}

Tag.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		tag_name: {
			type: DataTypes.STRING,
			defaultValue: 'tools, api, concepts, goals'
		},
		project_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'project',
				id: 'id'
			}
		}
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'tag'
	}
);

module.exports = Tag;
