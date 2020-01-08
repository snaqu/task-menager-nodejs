const { mongooseUrl } = require('../../utils/appConstants');

const validator = require('validator');
const mongoose = require('mongoose');

mongoose.connect(mongooseUrl, {
  useMongoClient: true,
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
      if (value < 0 ) {
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
})

const newUser = new User({
  name: 'Tom',
  email: 'test@dwa.com',
  age: 1,
  password: 'password1',
})

newUser.save().then(() => {
  console.log('ok');
}).catch((err) => {
  console.log('error', err);
})

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

const newTask = new Task({
  description: 'Laborum do nostrud qui voluptate dolor eiusmod duis et.',
  completed: true,
})

newTask.save().then(() => {
  console.log('Saving completed!');
}).catch((err) => {
  console.log('Something went wrong!', err);
})
