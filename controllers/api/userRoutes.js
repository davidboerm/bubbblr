const router = require('express').Router();
const { User } = require('../../models');

router.get('/:id', async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.id, {
			exclude: [ 'password', 'email' ]
		});
		console.log('userData ' + userData);
		const users = userData.get({ plain: true });
		// console.log('users ' + users);
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});
router.post('/', async (req, res) => {
	try {
		const userData = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		req.session.save(() => {
			req.session.logged_in = true;
			req.session.user_id = userData.id;
			req.session.name = userData.name;
			res.status(200).json(userData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			res.status(500).json({ message: 'Wrong Email' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Wrong Password' });
			return;
		}

		req.session.save(() => {
			req.session.logged_in = true;
			req.session.user_id = userData.id;
			req.session.name = userData.name;
			res.json({ user: userData, message: 'Logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
