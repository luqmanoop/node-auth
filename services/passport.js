const passport = require('passport')
const Company = require('mongoose').model('company')
const LocalStrategy = require('passport-local').Strategy
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const {jwtSecret} = require('../config/keys')

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

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  Company.findById(payload.sub, (err, company) => {
    if (err) { return done(err, false) }
    if (!company) { return done(null, false, {message: 'Authentication failed'}) }

    return done(null, company)
  })
}))
