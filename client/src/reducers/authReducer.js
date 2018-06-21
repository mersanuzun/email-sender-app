import * as types from "../actions/types.js";

export default (state = {user: null}, action) => {
    switch(action.type) {
        case types.FETCH_USER :
            return {
                user: action.data
            }
    }
    return state;
}