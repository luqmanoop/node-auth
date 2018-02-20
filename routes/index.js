module.exports = (app) => {
  require('../services/passport')
  require('./auth')(app)
}
