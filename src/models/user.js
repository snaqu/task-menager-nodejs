const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	email: {
		type: String,
		unique: true,
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
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'mySecretKey');
	user.tokens = [ ...user.tokens, { token } ];
	await user.save();

	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login!');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login!');
	}

	return user;
};

userSchema.pre('save', async function(next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
