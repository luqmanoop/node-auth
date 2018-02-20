const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(passport.initialize())
}
