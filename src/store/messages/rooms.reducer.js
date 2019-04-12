import * as types from './../types';


const initialState = {
};



export default (state = initialState, action) => {
    switch (action.type) {
        //case types.MESSAGES_SEND_MESSAGE:
        //    return {
        //        ...state,
        //        [action.friendId]: [
        //            ...state[action.friendId], action.message
        //        ],
        //    };
        case types.MESSAGES_SET_ROOMS:
            return {
                ...state,
                ...action.rooms,
            };
        case types.MESSAGES_SET_ROOM:
            return {
                ...state,
                [action.friendId]: {
                    ...action.room,
                    hasMore: typeof action.hasMore === 'boolean' ? action.hasMore : state[action.friendId].hasMore,
                    seen: (action.room.messages && action.room.messages[0]) ? action.room.messages[0].seen !== false : true,
                }
            };
        case types.SET_BLOCKING_STATUS:
            return {
                ...state,
                [action.friendId]: {
                    ...state[action.friendId],
                    blocked: action.blocked,
                    blockedBy: action.blockedBy,
                }
            };
        case types.SET_MESSAGE_SEEN:
            return {
                ...state,
                [action.friendId]: {
                    ...state[action.friendId],
                    seen: action.seen,
                }
            };
        // case types.GET_ROOMS: 
        // return {
        //     ...state,
        //     rooms : action.rooms,
        // }
        default:
            return state
    }
}
