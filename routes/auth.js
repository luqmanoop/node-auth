const {signupController} = require('./controllers/authController')
const passport = require('passport')

module.exports = (app) => {
  app.post('/signin', passport.authenticate('local', {session: false}), function (req, res) {
    res.send({user: req.user})
  })

  app.post('/signup', signupController)
}
