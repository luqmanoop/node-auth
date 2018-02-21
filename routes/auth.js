const {signupController, signinController} = require('./controllers/authController')
const passport = require('passport')

const requireSignIn = passport.authenticate('local', {session: false})

module.exports = (app) => {
  app.post('/signin', requireSignIn, signinController)
  app.post('/signup', signupController)
}
