import * as types from './../types';

const initialState = {
    friends: null,
    suggested: null,
    pending:  null,
    requested: null,
};

export default function friendsReducer(state = initialState, action) {
    switch (action.type) {
        
        case types.FRIENDS_GET_FRIENDS_SUCCESS:
            return {
                ...state,
                friends: action.friends,
                loadingFriends: false,
            };
            
        case types.FRIENDS_GET_SUGGESTED_SUCCESS:
            return {
                ...state,
                suggested: action.suggested,
                loadingSuggested: false,
            };
            
        case types.FRIENDS_GET_PENDING_SUCCESS:
            return {
                ...state,
                pending: action.pending,
                loadingPending: false,
            };
            
        case types.FRIENDS_GET_REQUESTED_SUCCESS:
            return {
                ...state,
                requested: action.requested,
                loadingRequested: false,
            };
            
        default:
            return state
    }
}