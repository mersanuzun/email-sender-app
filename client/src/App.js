import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import Header from "./components/Header.js";
import DashBoard from "./components/DashBoard.js";
import SurveyNew from "./components/survey/NewSurvey";
import { connect } from "react-redux";
import * as actions from "./actions";
import axios from "axios";

const Landing = () => <h1>{"Landing"}</h1>;
const SurveyRespond = () => <h1 style={{textAlign: "center"}}>{"Thanks For Responding"}</h1>

if (process.env.NODE_ENV !== "production") {
  window.axios = axios;
}

class App extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={DashBoard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
          <Route exact path="/surveys/:surveyId/:choice" component={SurveyRespond} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: actions.fetchUser()(dispatch)
  }
}

export default connect(null, actions)(App);
