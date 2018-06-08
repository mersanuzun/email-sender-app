const express = require("express");
const app = express();
const routes = require("./routes.js");

routes(app);

const port = process.env.PORT || 5000;
app.listen(port);