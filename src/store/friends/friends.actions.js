import * as types from './../types';
import FriendsService from './../../services/FriendsService';
const LIMIT = 20;

export function getFriends(offset, limit = LIMIT) {
    return (dispatch) => {
        FriendsService.getFriends(offset, limit).then((resp) => {
            if (FriendsService.isOkStatus(resp.status)) {
                dispatch({
                    type: types.FRIENDS_GET_FRIENDS_SUCCESS,
                    friends: resp.friends,
                })
            }
        })
    }
}

export function getSuggested(offset, limit, friendsOfFriends) {
    return (dispatch) => {
        FriendsService.getSuggestedFriends(offset, limit, friendsOfFriends).then((resp) => {
            if (FriendsService.isOkStatus(resp.status)) {
                dispatch({
                    type: types.FRIENDS_GET_SUGGESTED_SUCCESS,
                    suggested: resp.suggested,
                })
            }
        })
    }
}

export function getPending(offset, limit = LIMIT) {
    return (dispatch) => {
        FriendsService.getPendingRequests(offset, limit).then((pending) => {
            dispatch({
                type: types.FRIENDS_GET_PENDING_SUCCESS,
                pending,
            });
        })
    }
}

export function getRequested(offset, limit = LIMIT) {
    return (dispatch) => {
        FriendsService.getFriendRequests(offset, limit).then((resp) => {
            if (FriendsService.isOkStatus(resp.status)) {
                dispatch({
                    type: types.FRIENDS_GET_REQUESTED_SUCCESS,
                    requested: resp.requested,
                })
            }
        })
    }
}

export function addFriendRequest(userId) {
    return (dispatch) => {
        FriendsService.sendFriendRequest(userId).then( () => {
            dispatch({
                type: types.SET_RELATIONS_AFTER_ADD,
                userId,
            });
        });
    }
}

export function respondFriendRequest(userId, status) {
    return (dispatch) => {
        FriendsService.respondFriendRequest(userId, status).then( () => {
            dispatch({
                type: types.SET_RELATIONS_AFTER_APPROVE,
                userId
            });
            dispatch(getFriends(0));
            dispatch(getRequested(0));
        });   
    }
}

export function removeFriend(userId) {
    return (dispatch) => {
        FriendsService.removeFriend(userId).then( () => {
            dispatch({
                type: types.SET_RELATIONS_AFTER_REMOVE,
                userId,
            });
            dispatch(getFriends(0));
        })
    }
}