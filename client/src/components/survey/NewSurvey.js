import React from "react";
import SurveyForm from "./SurveyFrom.js";
import SurveyReview from "./SurveyReview";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

class NewSurvey extends React.Component {

    state = { shouldShowSurveyReview: false }

    decideView() {
        if (this.state.shouldShowSurveyReview) {
            return (
                <SurveyReview
                    onBack={() => this.setState({ shouldShowSurveyReview: false })}
                />
            )
        }

        return (
            <SurveyForm
                onNext={() => this.setState({ shouldShowSurveyReview: true })}
            />
        )
    }

    render() {
        return (
            <div className="new-survey-content-wrapper">
                {this.decideView()}
            </div>
        );
    }
}

export default connect()(
    reduxForm({
        form: "surveyForm"
    })(NewSurvey)
);