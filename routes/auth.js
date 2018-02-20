const {signupController} = require('./controllers/authController')
module.exports = (app) => {
  app.post('/signin', (req, res) => {
      // signin logic
  })
  app.post('/signup', signupController)
}
