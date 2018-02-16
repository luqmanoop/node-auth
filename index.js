const express = require('express')
const appMiddleware = require('./middlewares')
const router = require('./routes')
const app = express()

// App config
appMiddleware(app)
router(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}. Visit http://localhost:${PORT}`)
})
