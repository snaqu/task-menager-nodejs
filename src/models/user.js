const validator = require('validator');
const mongoose = require('mongoose');

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate: (value) => {
			if (!validator.isEmail(value)) {
				throw new Error('Incorrect email address');
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate: (value) => {
			console.log('TCL: value', value);
			if (value < 0) {
				throw new Error('Incorrect age value');
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		validate: (val) => {
			if (val === 'password') {
				throw new Error('Incorrect password');
			}
		}
	}
});

module.exports = User;
