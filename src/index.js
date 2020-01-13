const express = require('express');
require('./db/mongoose');

const port = process.env.PORT || 3000;
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.use(express.json());

// users

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save(); 
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);    
  }
});

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
  const keysToUpdate = Object.keys(req.body);
  const allowedKeys = ['name', 'email', 'age', 'password'];
  const checkIfKeysToUpdateAreCorrect = keysToUpdate.every((key) => allowedKeys.includes(key));

  if (!checkIfKeysToUpdateAreCorrect) {
    return res.status(400).send({ error: 'Object keys are not valid!' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/users/:id', async (req, res) => {
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

// tasks

app.post('/tasks', async (req,res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/tasks', async (_, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const reqKeys = Object.keys(req.body);
  const allowedKeys = ['title', 'description', 'completed'];
  const areKeysValid = reqKeys.every((key) => allowedKeys.includes(key));

  if (!areKeysValid) {
    return res.status(500).send({ error: "Object keys are invalid!" });
  } 

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
})
