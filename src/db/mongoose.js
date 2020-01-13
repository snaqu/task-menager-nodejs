const { mongooseUrl } = require('../../utils/appConstants');

const mongoose = require('mongoose');

mongoose.connect(mongooseUrl, {
  useFindAndModify: false,
  useMongoClient: true,
})
