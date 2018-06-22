const router = require("express").Router();
const loginRequired = require("../middlewares/loginRequired");
const creditRequired = require("../middlewares/creditRequired");

router.post(
    "/surveys",
    loginRequired,
    creditRequired,
    (req, res) => {
        console.log(req.body)
        res.send(req.user);
    }
)

module.exports = router;
