const router = require('express').Router();
const { Tag } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const tagData = await Tag.findAll({});

		const tag = tagData.map((tag) => tag.get({ plain: true }));
		res.status(200).json(tag);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', (req, res) => {
	try {
		console.log('request body ' + req.body);
		const tagData = Tag.create({
			tag_name: req.body.tag_name,
			project_id: req.body.project_id
			//UNCOMMENT after adding authorization
			//user_id: req.session.logged_in
		});
		console.log(tagData);
		res.status(200).json(tagData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const tagData = await Tag.update(req.body, {
			where: {
				id: req.params.id
			}
		});

		if (!tagData[0]) {
			res.status(404).json({ tag: 'No tag found with this ID' });
			return;
		}

		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const tagData = await Tag.destroy({
			where: { id: req.params.id }
		});
		if (!tagData[0]) {
			res.status(404).json({ tag: 'No tag found with this ID' });
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
