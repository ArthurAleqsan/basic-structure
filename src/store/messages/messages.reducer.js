import * as types from './../types';


const initialState = {
    messageText: '',
    draft: false,
    sending: false,
};


export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_SEND_MESSAGE:
            return {
                ...state,
                sending: true,
            };
        case types.SUCCESS_SEND_MESSAGE:
            return {
                ...state,
                sending: false,
                failSendLast: false,
                messageText: '',
                draft: false,
            };
        case types.FAIL_SEND_MESSAGE:
            return {
                ...state,
                failSendLast: true,
            };
        case types.MESSAGES_SET_IN_ACTION:
            return {
                ...state,
                inAction: action.inAction,
            };
        case types.MESSAGES_SET_TEXT:
            return {
                ...state,
                messageText: action.messageText,
                draft: !!action.messageText,
            };
        case types.SET_CHAT_WITH:
            return {
                ...state,
                user: action.user
            };
        default:
            return state
    }
}
