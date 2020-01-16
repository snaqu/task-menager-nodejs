const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(({ token }) => token !== req.token);
		await req.user.save();

		res.send('completed logout!');
	} catch (error) {
		res.status(500).send();
	}
});

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();

		res.send();
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send();
	}
});

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/users/:id', async (req, res) => {
	const keysToUpdate = Object.keys(req.body);
	const allowedKeys = [ 'name', 'email', 'age', 'password' ];
	const checkIfKeysToUpdateAreCorrect = keysToUpdate.every((key) => allowedKeys.includes(key));

	if (!checkIfKeysToUpdateAreCorrect) {
		return res.status(400).send({ error: 'Object keys are not valid!' });
	}

	try {
		const user = await User.findById(req.params.id);

		keysToUpdate.forEach((key) => (user[key] = req.body[key]));
		await user.save();

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndRemove(req.params.id);

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (error) {
		console.log('TCL: error', error);
		res.status(500).send(error);
	}
});

module.exports = router;
