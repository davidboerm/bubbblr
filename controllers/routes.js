const router = require('express').Router();
const { Message } = require('../models');

router.get('/', async (req, res) => {
	try {
		const messageData = await Chat.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((post) => post.get({ plain: true }));
		res.render('all', { messages });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
