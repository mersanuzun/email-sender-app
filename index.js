const express = require("express");
require("./models/Survey");
require("./models/User");
//import routers
const authRouter = require("./routes/authRoutes.js");
const profileRouter = require("./routes/profileRoutes.js");
const apiRouter = require("./routes/apiRoutes.js");
const surveyRouter = require("./routes/surveyRoutes");
const billingRouter = require("./routes/billingRoutes");

require("./services/passport.js");
const mongoose = require("mongoose");
const keys = require("./config/keys.js");
const cookieSession = require("cookie-session");
var bodyParser = require('body-parser');
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
app.use("/api", surveyRouter);
app.use("/api", billingRouter);

const path = require("path");

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets like our main.js and like main.css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file if it does not the recognize the route
    const path = require("path");
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// DB connection
mongoose.connect(keys.mongoDb.dbURI);

const port = process.env.PORT || 5000;
app.listen(port);