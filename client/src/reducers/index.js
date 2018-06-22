import authReducer from "./authReducer.js";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

export default combineReducers(
    {
        auth: authReducer,
        form: formReducer
    }
)