router.get('/', async (req, res) => {
	try {
		const roleData = await Role.findAll({});

		const role = roleData.map((role) => role.get({ plain: true }));
		res.status(200).json(role);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', (req, res) => {
	try {
		console.log('request body ' + req.body);
		const roleData = Role.create({
			name: req.body.name
			//UNCOMMENT after adding authorization
			//user_id: req.session.logged_in
		});
		console.log(roleData);
		res.status(200).json(roleData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const roleData = await Role.update(req.body, {
			where: {
				id: req.params.id
			}
		});

		if (!roleData[0]) {
			res.status(404).json({ role: 'No role found with this ID' });
			return;
		}

		res.status(200).json(roleData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const roleData = await Role.destroy({
			where: { id: req.params.id }
		});
		if (!roleData[0]) {
			res.status(404).json({ role: 'No role found with this ID' });
			return;
		}
		res.status(200).json(roleData);
	} catch (err) {
		res.status(500).json(err);
	}
});
