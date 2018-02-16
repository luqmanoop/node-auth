const express = require('express')
const appMiddleware = require('./middlewares')
const app = express()

// Middlewares
appMiddleware(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}. Visit http://localhost:${PORT}`)
})
