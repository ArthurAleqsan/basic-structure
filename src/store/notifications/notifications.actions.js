import * as types from './../types';
import NotificationsService from './../../services/NotificationsService';

export function getNotifications() {
    return (dispatch) => {
        NotificationsService.getNotifications().then( notifications => {
            dispatch({
                type: types.SET_NOTIFICATIONS,
                notifications
            })
        })
    }    
}

export function subscribeForNotifications() {
    return (dispatch, getState) => {
        dispatch(getNotifications());
        NotificationsService.subscribeForNotifications((notif) => {
            const {notifications} = getState().notifications;
            dispatch({
                type: types.SET_NOTIFICATIONS,
                notifications: [notif, ...notifications],
            })
        })
    }
}

export function notificationSeen(id) {
    return (dispatch, getState) => {
        const {notifications} = getState().notifications;
        const index = notifications.findIndex(n => n.id ===id );
        const notification = notifications[index];
        notifications.splice(index, 1, {...notification, seen: true});
        NotificationsService.setSeen(id);
        dispatch({
            type: types.SET_NOTIFICATIONS,
            notifications: [...notifications],
        })
    }
}