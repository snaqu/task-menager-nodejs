const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
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
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

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
