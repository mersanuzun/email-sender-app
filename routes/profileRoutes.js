const router = require("express").Router();
const loginRequired = require("../middlewares/loginRequired.js");

router.get(
    "/", 
    loginRequired,
    (req, res) => {
        const user = req.user;

        res.send("You logged in as " + user.displayName);
    }
);

module.exports = router;