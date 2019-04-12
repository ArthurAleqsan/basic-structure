import * as types from './../types';

const initialState = {
    currentUser: null,
    user: null,
    subCategories: [],
    foundedUsers: [],
    query: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.USER_GET_SUCCESS:
            return {
                ...state,
                user: action.user,
            };
        case types.USER_GET_CURRENT_SUCCESS:
            return {
                ...state,
                currentUser: action.currentUser
            };
        case types.LOG_OUT:
            return {
                ...state,
                currentUser: null,
            };
        case types.GET_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                subCategories: action.payload,
            };
        case types.CHANGE_SETTINGS_FIELDS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    [action.field]: action.value,
                },
            };
        case types.CHANGE_SETTINGS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.data,
                },
            };
        case types.GET_FOUNDED_USERS:
            return {
                ...state,
                foundedUsers: action.foundedUsers,
                query: action.query,
            };
        case types.SET_RELATIONS_AFTER_ADD:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    friendsPending: [...state.currentUser.friendsPending,action.userId],
                }
            };
        case types.SET_RELATIONS_AFTER_REMOVE:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    friends : state.currentUser.friends.filter( i => i !== action.userId),
                }
            };
        case types.SET_RELATIONS_AFTER_APPROVE:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    friends: [...state.currentUser.friends,action.userId],
                    friendsRequested : state.currentUser.friendsRequested.filter( i => i !== action.userId),
                }
            };
        default:
            return state
    }
}