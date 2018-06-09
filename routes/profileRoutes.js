const router = require("express").Router();

const authCheck = (req, res, next) => {
    const user = req.user;
    if (user) {
        next();
    } else {
        res.send("User not found")
    }
}

router.get(
    "/", 
    authCheck,
    (req, res) => {
        const user = req.user;

        res.send("You logged in as " + user.displayName);
    }
);

module.exports = router;