const router = require('express').Router();
const { Message, User } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const messageData = await Message.findAll({
			include: [
				{
					model: User,
					exclude: [ 'password' ],
					attributes: [ 'name' ]
				}
			],
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.status(200).json(messages);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const messageData = await Message.create({
			chat_text: req.body.chat_text,
			//UNCOMMENT after adding authorization
			user_id: req.session.user_id,
			//UNCOMMENT after adding tags feature
			tag_id: req.session.selectedTag,
			project_id: req.session.currentProjectId
		});

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
