const sgMail = require('@sendgrid/mail');
const keys = require("../config/keys");

sgMail.setApiKey(keys.sendGrid.apiKey);

const send = (survey, mailBodyCreater) => {
    const recipients = survey.recipients.map(recipient => recipient.email);
    const htmlBody = mailBodyCreater(survey);

    const msg = {
        to: recipients,
        from: 'tindermersanuzun@gmail.com',
        subject: survey.subject,
        html: htmlBody,
      };

    return sgMail.sendMultiple(msg)
}

module.exports = {
    send
}