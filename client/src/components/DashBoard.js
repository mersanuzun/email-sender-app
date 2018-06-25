import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Loading from "./Loading";

class DashBoard extends React.Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys(surveys) {
        return surveys.map(survey => {

            return (
                <div className="row" key={survey._id}>
                    <div className="col s12 m12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{survey.title}</span>
                                <p>{survey.body}</p>
                            </div>
                            <div className="card-action">
                                <a>{"YES: "}{survey.yes}</a>
                                <a>{"NO: "}{survey.no}</a>                                
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderContent() {
        const surveysData = this.props.surveys;

        if (surveysData.isFetching) {
            return <Loading size="large" />
        }

        return this.renderSurveys(surveysData.data)
    }

    render() {
        return (
            <div>
                {this.renderContent()}
                <div className="fixed-action-btn">
                    <Link to="surveys/new" className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        surveys: state.survey
    }
}

export default connect(mapStateToProps, actions)(DashBoard);