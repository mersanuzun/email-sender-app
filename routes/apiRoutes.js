const router = require("express").Router();
const keys = require("../config/keys.js");
const stripe = require("stripe")(keys.stripe.secretKey);
const loginRequired = require("../middlewares/loginRequired.js");
const creditRequired = require("../middlewares/creditRequired.js");
const mongoose = require("mongoose");
const Recipient = require("../models/Recipient");

router.get(
    "/test",
    (req, res) => {
        const Survey = mongoose.model("Survey");
        const survey = new Survey({
            title: "Test Title",
            body: "Test Body",
            recipients: [new Recipient("mersanuzun@gmail.com")],
            subject: "Test Subject",
            user: req.user.id
        }).save();
        res.send("OK")
    }
)

router.get(
    "/current_user",
    loginRequired,
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
