import * as types from './../types';

const initialState = {
    announcements : null,
};

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_LIST_OF_ANNOUNCEMENTS:
            return {
                ...state,
                announcements : action.announcements,
            };
        default:
            return state;
    }
}