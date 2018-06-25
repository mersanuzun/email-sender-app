import * as types from "../actions/types.js";
const initialState = {
    isSubmiting: false,
    isFetching: false,
    data: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.SUBMITING_SURVEY:
            return {
                ...state,
                isSubmiting: true
            }
        case types.SUBMITED_SURVEY:
            return {
                ...state,
                isSubmiting: false
            }
        case types.FETCHING_SURVEYS:
            return {
                ...state,
                isFetching: true
            }
        case types.FETCHED_SURVEYS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
    }
    return state;
}