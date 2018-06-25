const keys = require("../config/keys");

const surveyMailCreater = (survey) => {
    return `
        <div style="display:flex; flex-direction:column; align-items: center">
            <div><b>${survey.body}</b></div>
            <div>
                <a href="${keys.server.domain}/${survey.id}/yes">YES</a>
            <div>
            <div>
                <a href="${keys.server.domain}/${survey.id}/no">NO</a>
            <div>
        </div>
    `;
}

module.exports = {
    surveyMailCreater
}