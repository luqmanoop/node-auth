const mongoose = require('mongoose')
const Company = mongoose.model('company')
const jwt = require('jwt-simple')
const {jwtSecret} = require('../../config/keys')

const generateToken = (company) => {
  const issuedTime = new Date().getTime()
  return jwt.encode({sub: company.id, iat: issuedTime}, jwtSecret)
}

exports.signinController = (req, res) => {
  res.send({token: generateToken(req.user)})
}

exports.signupController = (req, res, next) => {
  const {name = null, email = null, password = null} = req.body || {}
  if (!name || !email || !password) return res.status(422).send({error: 'please provide company name, email and password.'})

  Company.findOne({email}, (err, existingCompany) => {
    if (err) return next(err)

    if (existingCompany) return res.status(422).send({error: 'Email already in use.'})

    const company = new Company({
      email,
      name,
      password
    })

    company.save()
    .then(company => {
      res.json({token: generateToken(company)})
    }).catch(err => {
      return next(err)
    })
  })
}
