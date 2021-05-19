const router = require('express').Router();
const { Message } = require('../models');

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

module.exports = router;
