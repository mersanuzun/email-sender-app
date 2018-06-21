const router = require("express").Router();
const keys = require("../config/keys.js");
const stripe = require("stripe")(keys.stripe.secretKey);
const loginRequired = require("../middlewares/loginRequired.js");
const creditRequired = require("../middlewares/creditRequired.js");

router.get(
    "/current_user",
    (req, res) => {
        res.send(req.user);
    }
)

router.post(
    "/stripe",
    loginRequired,
    async (req, res) => {
        const { token } = req.body;
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: 'Example charge',
            source: token.id,
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    }
)

module.exports = router;
