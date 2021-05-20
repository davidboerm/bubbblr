const router = require('express').Router();
const { Message, User, Tag, Project } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const messageData = await Message.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.render('chat', { messages, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', async (req, res) => {
	try {
		const messageData = await Message.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const messages = messageData.map((message) => message.get({ plain: true }));
		res.render('login', { messages, logged_in: req.session.logged_in, user_id: req.session.user_id });
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
		res.render('setup', { messages, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/chat', withAuth, async (req, res) => {
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
		res.render('chat', { messages, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/outline', withAuth, async (req, res) => {
	try {
		const projectData = await Project.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});

		const projects = projectData.map((project) => project.get({ plain: true }));
		res.render('outline', { projects, name: req.session.name, description: req.session.description, message_id: req.session.message_id  });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
