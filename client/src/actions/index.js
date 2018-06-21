import { FETCH_USER } from "./types.js";
import axios from "axios";

export const fetchUser = () => {
    return (dispatch) => {
        axios
            .get("/api/current_user")
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