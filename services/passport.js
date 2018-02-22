const passport = require('passport')
const User = require('mongoose').model('user')
const LocalStrategy = require('passport-local').Strategy
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const {jwtSecret} = require('../config/keys')

const localOptions = {usernameField: 'email'}
passport.use(new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false, {message: 'Invalid email/password'}) }

    user.verifyPassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false, {message: 'Invalid email/password'}) }

      return done(null, user)
    })
  })
}))

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, company) => {
    if (err) { return done(err, false) }
    if (!company) { return done(null, false, {message: 'Authentication failed'}) }

    return done(null, company)
  })
}))
