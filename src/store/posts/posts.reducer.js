import * as types from './../types';

const initialState = {
    posts: [],
    newsFeed: [],
    offset: -20,
};


export default function postsReducer(state = initialState, action) {
    let prevPosts = [];
    let indexOfPost;
    switch (action.type) {
        case types.SUCCESS_GET_POSTS:
            prevPosts = action.offset === 0 ? [] : state.posts;
            return {
                ...state,
                posts: [...prevPosts, ...action.posts],
                offset: action.offset,
            };
        case types.SUCCESS_GET_NEWSFEED:
            prevPosts = action.offset === 0 ? [] : state.newsFeed;
            return {
                ...state,
                newsFeed: [...prevPosts, ...action.posts],
                offset: action.offset,
            };
        case types.EDIT_POST:
            return {
                ...state,
                posts: action.newPosts,
            };
        case types.SET_POST_LIKE:
            return {
                ...state,
            };
        case types.SET_POST_UNLIKE:
            return {
                ...state,
            };
        case types.SET_NEWSFEED:
            return {
                ...state,
                newsFeed: action.newsFeed,
            };
        case types.SET_POSTS_AND_NEWSFEED:
            return {
                ...state,
                posts: action.posts,
                newsFeed: action.newsFeed,
            };
        case types.SET_COMMENTS_COUNT:
            if (action.fromPage === 'newsFeed') {
                indexOfPost = state.newsFeed.findIndex(post => post.postId === action.postId);
                console.log(state.newsFeed[indexOfPost])
                return {
                    ...state,
                    newsFeed: [
                        ...state.newsFeed,
                       indexOfPost = {
                            ...state.newsFeed[indexOfPost],
                            commentCount: action.countOfComments
                        }
                    ]

                }
            }
            break;
        default:
            return state
    }
}