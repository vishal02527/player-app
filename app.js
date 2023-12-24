const express = require('express');
const app = express();
const port = 5001;
const db = require('./db');
const playersRouter = require('./players');

app.use(express.static('public'));

app.use('/', playersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
