const passport = require('passport')

const requireToken = passport.authenticate('jwt', {session: false})

module.exports = (app) => {
  require('../services/passport')
  require('./auth')(app)

  // protected resource
  app.get('/profile', requireToken, (req, res) => {
    res.send('hello world')
  })
}
