const router = require('express').Router();
const { Message, User, Tag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const messageData = await Message.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.render('login', { messages });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/setup', withAuth, async (req, res) => {
	try {
		const messageData = await Message.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.render('setup', { messages });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/chat', async (req, res) => {
	try {
		const messageData = await Message.findAll({
			include: [
				{
					model: User,
					exclude: [ 'password' ],
					attributes: [ 'name' ]
				},
				{
					model: Tag,
					attributes: [ 'tag_name' ]
				}
			],
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.render('chat', { messages });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
