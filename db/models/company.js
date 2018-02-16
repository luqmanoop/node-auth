const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  isVerified: {type: Boolean, default: false}
  // TODO: add timestamps to remove accounts not verified for a period of time
})

mongoose.model('company', companySchema)
