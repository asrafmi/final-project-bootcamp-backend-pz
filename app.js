const express = require('express');
const connectDB = require('./src/database');

const app = express();

connectDB();

/**
 * routing
 */
const routesApiV1 = require('./src/routes/v1routes');

app.use('/api/v1', routesApiV1);
app
  .route('*')
  .get((req, res) => {
    res.send("you're inside fallback route");
  })
  .post((req, res) => {
    res.send("you're inside fallback route");
  })
  .put((req, res) => {
    res.send("you're inside fallback route");
  })
  .delete((req, res) => {
    res.send("you're inside fallback route");
  });

module.exports = app;