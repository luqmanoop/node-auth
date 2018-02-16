const mongoose = require('mongoose')
const config = require('../config/keys')

mongoose.connect(config.database)

// models
require('./models')
