const express = require("express");
const app = express();
const routes = require("./routes.js");

routes(app);

const port = process.env.NODE_ENV || 5000;
app.listen(port);