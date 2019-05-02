import * as types from './../types';

// type - one of [MEMBER, TEACHER]

const initialState = {
    categories: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories,
            };

        default:
            return state
    }
}
