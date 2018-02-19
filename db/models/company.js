const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  isVerified: {type: Boolean, default: false}
  // TODO: add timestamps to remove accounts not verified for a period of time
})

companySchema.pre('save', function (next) {
  const company = this

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(company.password, salt, (err, encryptedPassword) => {
      if (err) return next(err)

      company.password = encryptedPassword
      next()
    })
  })
})

companySchema.methods.verifyPassword = function (userPassword, callback) {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}

mongoose.model('company', companySchema)
