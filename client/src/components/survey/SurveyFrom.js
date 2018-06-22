import React from "react";
import { Field, reduxForm } from 'redux-form';
import SurveyField from "./SurveyField";
import surveyFields from "./surveyFields";
import { Link } from "react-router-dom";

const email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class SurveyForm extends React.Component {

    renderFields(fields) {
        return (
            fields.map(({ name, label }) => {
                return (
                    <Field
                        key={name}
                        name={name}
                        type="text"
                        value="123123"
                        label={label}
                        component={SurveyField}
                    />
                )
            })
        )

    }

    render() {
        return (
            <div className="survey-form-wrapper">
                <form onSubmit={this.props.handleSubmit(this.props.onNext)}>
                    {this.renderFields(surveyFields)}
                    <Link
                        to="/surveys"
                        className="waves-effect red btn-flat white-text"
                    >
                        {"Cancel"}
                    </Link>
                    <button
                        type="submit"
                        className="waves-effect green right btn-flat white-text"
                    >
                        {"Next"}
                        <i className="large material-icons right">chevron_right</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    const isAllEmailVaild = (values.recipients || "").split(",")
        .map(email => email.trim())
        .find(email => !email_regex.test(email));

    if (isAllEmailVaild) {
        errors["recipients"] = "Recipient list contains a invalid email."
    }

    surveyFields.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = "Required field.";
        }
    });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: "surveyForm",
    destroyOnUnmount: false
})(SurveyForm);