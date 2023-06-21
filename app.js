const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swagger = require('./src/docs/swagger.json')
const connectDB = require("./src/database/product");
const bodyParser = require("body-parser");

const app = express();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * routing
 */
const routesApi = require("./src/routes/route");

app.use("/api", routesApi);
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
