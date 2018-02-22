const mongoose = require('mongoose')
const User = mongoose.model('user')
const jwt = require('jwt-simple')
const {jwtSecret} = require('../../config/keys')

const generateToken = (user) => {
  const issuedTime = new Date().getTime()
  return jwt.encode({sub: user.id, iat: issuedTime}, jwtSecret)
}

exports.signinController = (req, res) => {
  res.send({token: generateToken(req.user)})
}

exports.signupController = (req, res, next) => {
  const {name = null, email = null, password = null} = req.body || {}
  if (!name || !email || !password) return res.status(422).send({error: 'please provide email and password.'})

  User.findOne({email}, (err, existingUser) => {
    if (err) return next(err)

    if (existingUser) return res.status(422).send({error: 'Email already in use.'})

    const user = new User({
      email,
      name,
      password
    })

    user.save()
    .then(user => {
      res.json({token: generateToken(user)})
    }).catch(err => {
      return next(err)
    })
  })
}
