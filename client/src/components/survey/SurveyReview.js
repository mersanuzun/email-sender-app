import React from "react";
import { connect } from "react-redux";
import surveyFields from "./surveyFields";
import { withRouter } from "react-router";
import * as actions from "../../actions";

class SurveyReview extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div className="survey-review-wrapper">
                <div className="survey-review">
                    <div className="title-wrapper">
                        {
                            surveyFields.map(({ name, label }) => {
                                return (
                                    <div key={name}>
                                        <label>{label}</label>
                                        <div>
                                            {this.props.formValues[name]}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <a
                    onClick={this.props.onBack}
                    className="waves-effect yellow btn-flat white-text"
                >
                    {"Back"}
                </a>
                <button
                    onClick={() => this.props.submitSurvey(
                        this.props.formValues,
                        () => this.props.history.push("/surveys")
                    )}
                    className="waves-effect green right btn-flat white-text"
                >
                    {"Send"}
                    <i className="large material-icons right">send</i>
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({ form }) => {
    return {
        formValues: form.surveyForm.values
    }

}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));