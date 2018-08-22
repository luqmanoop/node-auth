const mongoose = require('mongoose');
const config = require('../config/keys');

mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
// models
require('./models');
