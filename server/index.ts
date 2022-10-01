// File for creating the server
import express = require('express');
const PORT = process.env.PORT || 4040
import user = require('./routes/user');
const app = express();

app.use('/user', user.default);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})
