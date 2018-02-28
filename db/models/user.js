const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, required: true, minlength: 6 },
  password: { type: String, required: true }
})

userSchema.pre('save', function (next) {
  const user = this

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, encryptedPassword) => {
      if (err) return next(err)

      user.password = encryptedPassword
      next()
    })
  })
})

userSchema.methods.verifyPassword = function (userPassword, callback) {
  bcrypt.compare(userPassword, this.password, (err, passwordMatch) => {
    if (err) return callback(err)
    // TODO check if passowrd is empty

    callback(null, passwordMatch)
  })
}

mongoose.model('user', userSchema)
