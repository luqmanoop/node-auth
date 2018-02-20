const passport = require('passport')
const Company = require('mongoose').model('company')
const LocalStrategy = require('passport-local').Strategy

const localOptions = {usernameField: 'email'}
passport.use(new LocalStrategy(localOptions, (email, password, done) => {
  Company.findOne({email}, (err, company) => {
    if (err) { return done(err) }
    if (!company) { return done(null, false, {message: 'Invalid email/password'}) }

    company.verifyPassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false, {message: 'Invalid email/password'}) }

      return done(null, company)
    })
  })
}))
