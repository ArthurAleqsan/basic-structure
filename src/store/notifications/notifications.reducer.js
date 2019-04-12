import * as types from './../types';

const initialState = {
    notifCount: 0,
    notifications: [],
};



export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_NOTIFICATIONS_COUNT:
            return {
                ...state,
                notifCount: action.notifCount,
            };
        case types.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications,
            };
        default:
            return state;
    }
}