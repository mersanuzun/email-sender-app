const router = require("express").Router();
const loginRequired = require("../middlewares/loginRequired");
const creditRequired = require("../middlewares/creditRequired");
const mongoose = require("mongoose");
const Survey = mongoose.model("Survey");
const sendGrid = require("../services/sendGrid");
const { surveyMailCreater } = require("../services/mailTemplateCreator");
const Path = require("path-parser").default;
const { URL } = require("url");

router.post(
    "/surveys",
    loginRequired,
    creditRequired,
    async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email => ({ email: email.trim() })),
            user: req.user.id,
            dateSent: Date.now()
        });

        const resp = await sendGrid.send(survey, surveyMailCreater);
        survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(req.user);
    }
)

router.post(
    "/surveys/webhooks",
    (req, res) => {
        const events = req.body;
        const path = new Path("/surveys/:surveyId/:choice");
        events.reduce((cleanedEvents, event) => {
            const eventType = event.event;
            const email = event.email;
            const pathname = new URL(event.url).pathname;
            const parameters = path.test(pathname);

            if (event.event !== "click" || !parameters || !email) return cleanedEvents;

            return cleanedEvents.some(cEvent => cEvent.surveyId === surveyId && cEvent.email === email) ?
                cleanedEvents :
                cleanedEvents.concat({
                    surveyId: parameters.surveyId,
                    email,
                    choice: parameters.choice
                })
        }, []).forEach(eachEvent => {
            Survey.updateOne({
                _id: eachEvent.surveyId,
                recipients: {
                    $elemMatch: { email: eachEvent.email, respond: false }
                }
            }, {
                    $inc: { [eachEvent.choice]: 1 },
                    $set: {
                        'recipients.$.respond': true,
                        'lastResponde': new Date()
                    }
                });
        });

        res.send({});

    }
)

router.get(
    "/surveys",
    loginRequired,
    async (req, res) => {
        const userId = req.user.id;

        const surveys = await Survey.find({
            user: {
                _id: userId
            }
        },{
            recipients: 0
        });

        res.send(surveys);
    }
)

module.exports = router;
