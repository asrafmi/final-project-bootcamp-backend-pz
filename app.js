const express = require("express");
const app = express();
const swaggerUI = require('swagger-ui-express');
const { notFound, errorHandler } = require("./src/middleware/errorHandler");
const swagger = require('./src/docs/swagger.json')
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConnect");
const dotenv = require('dotenv').config();
connectDB();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * routing
 */
const routesApi = require("./src/routes/route");

app.use("/api", routesApi);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`application listen on http://localhost:${PORT}`);
});
module.exports = app;
