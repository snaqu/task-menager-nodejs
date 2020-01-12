const express = require('express');
require('./db/mongoose');

const port = process.env.PORT || 3000;
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.use(express.json());

// users

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save().then(() => {
    res.send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((err) => {
    res.status(500).send(err);
  })
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  }).catch((err) => {
    res.status(500).send(err);
  })
})

// tasks

app.post('/tasks', (req,res) => {
  const task = new Task(req.body);

  task.save().then(() => {
    res.send(task);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks);
  }).catch((err) => {
    res.status(500).send(err);
  })
})

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  console.log('TCL: req.params', req.params);

  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  }).catch((err) => {
    res.send(500).send(err);
  })
})

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
})
