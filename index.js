const express = require('express');
const appMiddlewares = require('./middlewares');
const router = require('./routes');
const app = express();

require('./db');
appMiddlewares(app);
router(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});
