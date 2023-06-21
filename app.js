const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swagger = require('./src/docs/swagger.json')
const connectDB = require("./src/database/product");

const app = express();

connectDB();

/**
 * routing
 */
const routesApiV1 = require("./src/routes/route-v1");

app.use("/api/v1", routesApiV1);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

app
  .route("*")
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


app.listen(3000, () => {
  console.log("application listen on http://localhost:3000");
});
module.exports = app;
