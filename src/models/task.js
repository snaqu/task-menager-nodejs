const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  title: {
    type: String,
    required: true,
    maxlength: 191,
  },
  description: {
    type: String,
    required: true,
    maxlength: 65535,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = Task;
