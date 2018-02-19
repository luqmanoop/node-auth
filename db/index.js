const mongoose = require('mongoose')
const config = require('../config/keys')

mongoose.connect(config.database)
mongoose.Promise = global.Promise
// models
require('./models')
