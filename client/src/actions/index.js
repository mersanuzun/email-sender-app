import { FETCH_USER } from "./types.js";
import * as types from "./types";
import axios from "axios";

export const fetchUser = () => {
    return (dispatch) => {
        axios
            .get("/auth/current_user")
            .then((res) => {
                dispatch(
                    {
                        type: FETCH_USER,
                        data: res.data
                    }
                );
            });
    }
}

export const sendStripeToken = (token) => {
    return (dispatch) => {
        axios
            .post(
                "/api/stripe",
                {
                    token
                }
            )
            .then(res => {
                dispatch(
                    {
                        type: FETCH_USER,
                        data: res.data
                    }
                )
            })
    }
}

export const submitSurvey = (surveyData, changeRoute) => {
    return async (dispatch) => {
        dispatch({ type: types.SUBMITING_SURVEY });
        const resp = await axios.post("/api/surveys", surveyData);
        dispatch({ type: types.SUBMITED_SURVEY });
        changeRoute();
        dispatch({ type: FETCH_USER, data: resp.data });
    }
}

export const fetchSurveys = () => {
    return async (dispatch) => {
        dispatch({ type: types.FETCHING_SURVEYS });
        const resp = await axios.get("/api/surveys");
        dispatch({ type: types.FETCHED_SURVEYS, data: resp.data });
    }
}