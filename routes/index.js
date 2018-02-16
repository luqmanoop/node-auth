module.exports = (app) => {
    // test route
  app.get('/', (req, res) => {
    res.send('Hello, world')
  })
}
