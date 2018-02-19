module.exports = (app) => {
    // test route
  app.get('/', (req, res) => {
    res.send('Hello, world')
  })

  // register auth route
  require('./auth')(app)
}
