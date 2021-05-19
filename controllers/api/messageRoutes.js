const router = require('express').Router();
const { Message } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const messageData = await Message.findAll({});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.status(200).json(messages);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', (req, res) => {
	try {
		console.log('request body ' + req.body);
		const messageData = Message.create({
			chat_text: req.body.chat_text
			//UNCOMMENT after adding authorization
			//user_id: req.session.logged_in,
			//UNCOMMENT after adding tags feature
			//tag_id: req.session.selectedTag
		});
		console.log(messageData);
		res.status(200).json(messageData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const messageData = await Message.update(req.body, {
			where: {
				id: req.params.id
			}
		});

		if (!messageData[0]) {
			res.status(404).json({ message: 'No message found with this ID' });
			return;
		}

		res.status(200).json(messageData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const messageData = await Message.destroy({
			where: { id: req.params.id }
		});
		if (!messageData[0]) {
			res.status(404).json({ message: 'No message found with this ID' });
			return;
		}
		res.status(200).json(messageData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
