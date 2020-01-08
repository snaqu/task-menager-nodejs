const { mongodbUrl } = require('./utils/appConstants');
const { MongoClient, ObjectID } = require('mongodb');

const dbName = 'task-menager';

MongoClient.connect(mongodbUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to database!');
  }

  const db = client.db(dbName);

  // // remove every tasks with completed true
  // db.collection('tasks').deleteMany({
  //   completed: true,
  // }).then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log(err);
  // })

  // // update only records with completed false
  // db.collection('tasks').updateMany({ 
  //   completed: false,
  // }, {
  //   $set: {
  //     completed: true,
  //   },
  // }).then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log('Error!', err);
  // })

  // // return one Value
  // db.collection('tasks').findOne({ _id: new ObjectID('5e138f246550a042496b3d0e') }, (err, data) => {
  //   console.log('TCL: data', data);
  // })

  // return specific values and change to array
  db.collection('tasks').find({ completed: false }).toArray((err, data) => {
    console.log('TCL: data', data);
  })

  // insert many values
  // db.collection('tasks').insertMany([{
  //   description: 'Voluptate ad sunt esse mollit sint cupidatat.',
  //   completed: false,
  // },{
  //   description: 'Magna aliqua adipisicing Lorem anim ex mollit quis sit laborum fugiat est non culpa excepteur..',
  //   completed: false,
  // },{
  //   description: 'Sit proident nisi tempor sunt adipisicing tempor consectetur reprehenderit.',
  //   completed: true,
  // }], (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert tasks');
  //   }

  //   console.log(result.ops);
  // })

  // // insert one value
  // db.collection('users').insertOne({
  //   name: 'Donald',
  //   age: 41,
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert collection!');
  //   }

  //   console.log(result.ops);
  // });

  // // insert many values
  // db.collection('users').insertMany([{
  //   name: 'Obama',
  //   age: 63,
  // },{
  //   name: 'Putin',
  //   age: 63,
  // },{
  //   name: 'Duda',
  //   age: 47,
  // }], (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert many collections');
  //   }

  //   console.log(result.ops);
  // })
})
