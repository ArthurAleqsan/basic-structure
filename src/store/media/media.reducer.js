import * as types from './../types';

const initialState = {
    media: [],
    offset: -20,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_MEDIA_SUCCESS:
            return {
                ...state,
                media: action.media,
                offset: action.offset,
            };
        case types.SET_MEDIA:
            return {
                ...state,
                media: action.media,
            }
        default:
            return state
    }
}
