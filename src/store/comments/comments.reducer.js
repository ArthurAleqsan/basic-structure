import * as types from './../types';


const initialState = {
};



export default (state = initialState, action) => {
    let commentIndex;
    switch (action.type) {
        case types.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                [action.id]: action.data.comments
            }
        case types.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                [action.id]: action.data
            };

        case types.SUCCESS_EDIT_COMMENT:

            commentIndex = state[action.id].indexOf(comment => comment.commentId === action.commentId);
            console.log(commentIndex);
            return {
                ...state,
                [action.postId]: {

                }
            }
        default:
            return state
    }
}
