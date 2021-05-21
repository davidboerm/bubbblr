const router = require('express').Router();
const { Message, User, Tag, Project } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const projectData = await Project.findAll({});

		const projects = projectData.map((project) => project.get({ plain: true }));
		res.render('dashboard', { projects, logged_in: req.session.logged_in, user_id: req.session.user_id });
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

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const projectData = await Project.findAll({});

		const projects = projectData.map((project) => project.get({ plain: true }));
		res.render('dashboard', { projects, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/project/:id', withAuth, async (req, res) => {
	try {
		const projectData = await Project.findByPk(req.params.id, {
			include: [
				{
					model: Message,
					include: [ { model: User, exclude: [ 'password' ] }, { model: Tag, attributes: [ 'tag_name' ] } ]
				},
				{ model: Tag, attributes: [ 'tag_name' ] }
			]
		});

		req.session.save(() => {
			req.session.currentProjectId = req.params.id;
		});
		const project = projectData.get({ plain: true });
		res.render('chat', { project, logged_in: req.session.logged_in, user_id: req.session.user_id });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/outline/:id', withAuth, async (req, res) => {
	try {
		const projectData = await Project.findByPk(req.params.id, {
			include: [
				{
					model: Message,
					include: [
						{ model: User, exclude: [ 'password' ], attributes: [ 'name' ] },
						{ model: Tag, attributes: [ 'tag_name' ] }
					],
					attributes: [ 'chat_text', 'createdAt' ]
				},
				{ model: Tag, attributes: [ 'tag_name' ] }
			]
		});

		const project = projectData.get({ plain: true });
		res.render('outline', {
			project,
			logged_in: req.session.logged_in,
			user_id: req.session.user_id
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
