const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const projectData = await Project.findAll({
			include: [
				{
					model: User,
					exclude: [ 'password' ]
				},
				{
					model: Message,
					include: [ { model: User, exclude: [ 'password' ] }, { model: Tag } ]
				}
			]
		});

		const projects = projectData.map((project) => project.get({ plain: true }));
		res.status(200).json(projects);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const projectData = await Project.create({
			name: req.body.name,
			description: req.body.description,
			message_id: req.body.message_id,
			user_id: req.body.user_id,
			leader_id: req.session.user_id
		});
		console.log(projectData);
		res.status(200).json(projectData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const projectData = await Project.update(req.body, {
			where: {
				id: req.params.id
			}
		});

		if (!projectData[0]) {
			res.status(404).json({ project: 'No project found with this ID' });
			return;
		}

		res.status(200).json(projectData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
