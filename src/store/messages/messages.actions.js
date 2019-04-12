import * as types from "../types";
import MessagesService from './../../services/MessagesService';
import UserService from './../../services/UserService';

const LIMIT = 20;

export function activateMessageBar(friendId) {
    return (dispatch, getState) => {
        const  {messages = []} = getState().rooms[friendId] || [];
        const last = messages[messages.length-1];
        if (last.writer !== friendId) return; 
        MessagesService.setSeen(friendId, last.id).then((seen) => {
            dispatch({
                type: types.SET_MESSAGE_SEEN,
                seen,
                friendId,
            });
        })
    }
}
export function getSeensStatus() {
    MessagesService.subscribeMessages()
}

export function setText(messageText) {
    return {
        type: types.MESSAGES_SET_TEXT,
        messageText
    }
}

export function setRooms(rooms) {
    return (dispatch) => {
        dispatch({
            type: types.MESSAGES_SET_ROOMS,
            rooms,
        });    
    }
    
}
export function getMoreRooms(currentUserId, limit) {
    return (dispatch) => {
        MessagesService.init(currentUserId, limit).then( (rooms) => {
            dispatch(setRooms(rooms))
        });
    }

}

export function sendMessage(friendId) {
    return (dispatch, getState) => {
        dispatch({
            type: types.START_SEND_MESSAGE
        });
        const { messages, rooms } = getState();
        const { messageText } = messages;
        MessagesService.sendMessage(friendId, messageText).then(({ message }) => {
            dispatch(setNewMessage(friendId, message));
            dispatch({
                type: types.SUCCESS_SEND_MESSAGE
            });
        })
    };
}

function setNewMessage(friendId, message) {
    return (dispatch, getState) => {
        const room = getState().rooms[friendId];
        if (!room) {console.log('new message, cannot find room'); return}
        const newMessages = [...room.messages, message];
        dispatch({
            type: types.MESSAGES_SET_ROOM,
            friendId,
            room: {
                ...room,
                messages: newMessages,
            },
        })
    }

}

function updateMessage(friendId, message) {
    return (dispatch, getState) => {
        const room = getState().rooms[friendId];
        if (!room) {console.log('new event on message, cannot find room'); return}
        const modifMessageIndex = room.messages.findIndex(m => m.id === message.id);
        const modifMessage = room.messages[modifMessageIndex];
        const newMessages = [...room.messages];
        newMessages.splice(modifMessageIndex , 1, {...modifMessage, ...message});
        dispatch({
            type: types.MESSAGES_SET_ROOM,
            friendId,
            room: {
                ...room,
                messages: newMessages,
            },
        })
    }
}

export function getFriendMessages(friendId) {
    return (dispatch) => {
        dispatch({ type: types.MESSAGES_SET_IN_ACTION, inAction: true });
        MessagesService.getRoom(friendId).then((room) => {
            console.log(room);
            dispatch({
                type: types.MESSAGES_SET_IN_ACTION,
                inAction: false,
            });
            dispatch({
                type: types.MESSAGES_SET_ROOM,
                room,
                friendId,
                hasMore: true,
            })
        });
    }
}

export function getNextMessagesNextPage() {
    return (dispatch, getState) => {
        dispatch({ type: types.MESSAGES_SET_IN_ACTION, inAction: true });
        const { messages, rooms } = getState();
        const { user } = messages;
        if (!user) throw 'no user found';
        const friendId = user.id;
        const room = rooms[friendId];
        if (!room) throw 'room not found'; //TODO may be get room
        let { offset = -1 } = room;
        offset += 1;
        const count = (offset + 1) * LIMIT;
        MessagesService.getRoom(friendId, count).then((room) => {
            const hasMore = count === room.messages.length;
            dispatch({
                type: types.MESSAGES_SET_IN_ACTION,
                inAction: false,
            });
            dispatch({
                type: types.MESSAGES_SET_ROOM,
                room: { ...room, offset },
                friendId,
                hasMore,
            })
        })
    }
}
export function getUserAndSetChatWith(id) {
    return (dispatch) => {
        UserService.getUserById(id).then( ({status, user}) => {
            if (UserService.isOkStatus(status)) {
                dispatch(setChatWith(user))
            } 
        })
    }
}
export function setChatWith(user) {
    return (dispatch) => {
        dispatch({
            type: types.SET_CHAT_WITH,
            user
        });
    }
}

export function subscribeForMessages() {
    return (dispatch) => {
        MessagesService.subscribeMessages(({ message }, isNew = true, friendId) => {
            if (isNew) {
                const friendId = message.writer;
                dispatch(setNewMessage(friendId, message));   
            } else {
                dispatch(updateMessage(friendId, message))
            }
        });
        MessagesService.subscribeBlocked( (blocked, friendId) => {
            dispatch({
                type: types.SET_BLOCKING_STATUS,
                blocked,
                friendId,
                blockedBy: friendId,
            })
        });
    }
}

export function block(friendId) {
    return (dispatch) => {
        MessagesService.block(friendId).then(() => {
            dispatch({
                type: types.SET_BLOCKING_STATUS,
                blocked: true,
                friendId,
                blockedBy: 'me',
            });
        })
    }

}
export function unBlock(friendId) {
    return (dispatch) => {
        MessagesService.unblock(friendId).then((blocked) => {
            dispatch({
                type: types.SET_BLOCKING_STATUS,
                blocked: false,
                friendId,
            });
        })
    }

}