import authReducer from "./authReducer.js";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import surveyReducer from "./surveyReducer.js";

export default combineReducers(
    {
        auth: authReducer,
        form: formReducer,
        survey: surveyReducer
    }
)