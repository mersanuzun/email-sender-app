const express = require("express");
const authRouter = require("./routes/authRoutes.js");
const profileRouter = require("./routes/profileRoutes.js");
const apiRouter = require("./routes/apiRoutes.js");
require("./services/passport.js");
const mongoose = require("mongoose");
const keys = require("./config/keys.js");
const cookieSession = require("cookie-session");
var bodyParser = require('body-parser')
const passport = require("passport");

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: keys.cookieSession.keys
    })
);

app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/api", apiRouter);

// DB connection
mongoose.connect(keys.mongoDb.dbURI);

const port = process.env.PORT || 5000;
app.listen(port);