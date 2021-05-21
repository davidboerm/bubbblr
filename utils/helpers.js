const router = require('express').Router();

module.exports = {
	format_date: (date) => {
		return date.toLocaleDateString();
	},
	format_time: (date) => {
		return date.toLocaleTimeString();
	}
};
