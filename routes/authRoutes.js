const router = require("express").Router();
const passport = require("passport");

router.get(
    "/google", 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect("/surveys");
    }
);

router.get(
    "/logout",
    (req, res) => {
        req.logout();
        res.redirect("/")
    }
)

module.exports = router;
