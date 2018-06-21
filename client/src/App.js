import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import Header from "./components/Header.js";
import DashBoard from "./components/DashBoard.js";
import { connect } from "react-redux";
import * as actions from "./actions";

const Landing = () => <h1>{"Landing"}</h1>;
const SurveyNew = () => <h1>{"Survey"}</h1>;


class App extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={DashBoard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
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
