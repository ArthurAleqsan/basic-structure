import * as types from './../types';
import UserService from './../../services/UserService';
import AuthService from './../../services/AuthService';
import CategoryService from './../../services/CategoryService';
import 'antd/lib/message/style/index.css';
import { message } from 'antd';

export function login(form) {
    return () => {
        AuthService.login(form).then(({ status, json }) => {
            if (AuthService.isOkStatus(status)) {
                localStorage.setItem('token', json.accessToken);
                localStorage.setItem('scope', json.scope);
                if (json.scope === 'access:admin') {
                    window.location.reload();
                } else {
                    message.error('Username or/and password is wrong.');
                }

            }
            else {
                message.error('Username or/and password is wrong.');
            }
        })
    }
}
export function getUser() {
    return (dispatch) => {
        UserService.getUser().then(({ status, json: currentUser }) => {
            if (UserService.isOkStatus(status)) {
                //MessagesService.init(currentUser.id, LIMIT_OF_ROMMS).then( (rooms) => {
                //    dispatch(subscribeForMessages());
                //    dispatch(setRooms(rooms))
                //});


                dispatch({
                    type: types.USER_GET_CURRENT_SUCCESS,
                    currentUser,
                })
            } else {
                dispatch(logout());
            }
        })
    }
}



export function logout() {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({
            type: types.LOG_OUT,
        })
    }
}

export function logoutRequest() {
    return (dispatch) => {

    }
}
// Change user old password to new password
export function updatePassword(passwords) {
    return UserService.updatePassword(passwords);
}
// user settings
// change user fields
export function getSubCategoriesForUserSettings(id) {
    return dispatch => {
        CategoryService.getUserCategories().then(categories => {
            const subCategories = categories.find(category => category.id === id).subcategories;
            dispatch({
                type: types.GET_SUBCATEGORIES_SUCCESS,
                payload: subCategories,
            })
        });
    }

}

export function changeUserSettingsFields(field, value) {
    return dispatch => {
        dispatch({
            type: types.CHANGE_SETTINGS_FIELDS,
            field,
            value,
        });
    }
}


export function changeUserSettings(data) {
    return dispatch => {
        dispatch({
            type: types.CHANGE_SETTINGS,
            data
        });
    }
}

export function setUserSettings() {
    return (dispatch, getState) => {
        const currentUser = getState().user.currentUser;
        UserService.changeUserFields(currentUser).then(({ status, currentUser }) => {
            if (UserService.isOkStatus(status)) {
                dispatch({
                    type: types.USER_GET_CURRENT_SUCCESS,
                    currentUser
                })
            }
        })
    }
}
// get searched user
export function searchUser(query) {
    return (dispatch) => {
        return UserService.searchUser(query).then((foundedUsers) => {
            dispatch({
                type: types.GET_FOUNDED_USERS,
                foundedUsers,
                query,
            })
        })
    }
}
// get users friend
export function getUserFriend(userId, offset, limit) {
    return (dispatch) => {
        return UserService.getUserFriend(userId, offset, limit).then(resp => {

            dispatch({
                type: types.FRIENDS_GET_FRIENDS_SUCCESS,
                friends: resp.friends,
            })
        })
    }
}
// set users relation after clicking add button 
export function setUserRelationsAfterAddAction(offset, limit) {
    return (dispatch) => {
        UserService.getUser().then(({ json: currentUser }) => {
            dispatch({
                type: types.SET_RELATIONS_AFTER_ADD,
                friendsPending: currentUser.friendsPending,
            })
            // FriendsService.getPendingRequests(offset, limit).then(resp => console.log(resp))
        });
    }
}
// set users relation after clicking remove button 
export function setUserRelationsAfterRemoveAction() {
    return (dispatch) => {
        UserService.getUser().then(({ json: currentUser }) => {
            dispatch({
                type: types.SET_RELATIONS_AFTER_REMOVE,
                friends: currentUser.friends,
            })
        })

    }
}
// set users relation after clicking approve button 
export function setUserRelationsAfterApproveAction() {
    return (dispatch) => {
        UserService.getUser().then(({ json: currentUser }) => {
            dispatch({
                type: types.SET_RELATIONS_AFTER_APPROVE,
                friends: currentUser.friends,
                requested: currentUser.friendsRequested,
            })
        })

    }
}