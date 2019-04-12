import * as types from './../types';
import PostsService from '../../services/PostsService';
import {getMedia} from "../media/media.actions";
import MediaPostsService from '../../services/MediaPostsService';

const LIMIT = 20;
export function createNewPost(postData, mediaType) {
    return (dispatch) => {
        PostsService.createNewPost(postData).then(() => {
            if (mediaType) dispatch(getMedia(mediaType, 0));
            dispatch(getUsersNewsFeed(0));
            dispatch(getUsersPosts(0));
        });
    }
}

export function getUsersNewsFeed(offset = null) {
    return (dispatch, getState) => {
        offset = offset !== null ? offset : getState().posts.offset + LIMIT;
        PostsService.getUserNewsFeed({limit: LIMIT, offset})
            .then(posts => {
                dispatch({
                    type: types.SUCCESS_GET_NEWSFEED,
                    posts,
                    offset,
                });
            });
    }
}

export function getUsersPosts(offset = null) { //TODO use same action for  newsfeed and user posts
    return (dispatch, getState) => {
        const {posts, user: {user = {}}} = getState();
        offset = offset !== null ? offset : posts.offset + LIMIT;
        const {id: userId} = user;
        PostsService.getUserPosts({offset, userId, limit: LIMIT})
            .then(posts => {
                dispatch({
                    type: types.SUCCESS_GET_POSTS,
                    posts,
                    offset,
                });
            });
    }

}
export function getPostById(postId) {
    PostsService.getPostById(postId);
}

export function sharePost(postId, data, fromPage,) {
    return (dispatch) => {
        PostsService.sharePost(postId, data).then(status => {
            if (PostsService.isOkStatus(status)) {
                if (fromPage === 'newsFeed') {
                    dispatch(getUsersNewsFeed(0));
                } else {
                    dispatch(getUsersPosts(0));    
                }

            }
        });
    }

}

export function likePost(postId, isMedia, mediaType, offset ) {
    return (dispatch, getState) => {
        if(isMedia) {
            MediaPostsService.likePost(postId)
            .then(status => {
                if (MediaPostsService.isOkStatus(status)) {
                    dispatch(getMedia(mediaType , offset));
                }
            });
        } else {
            PostsService.likePost(postId)
            .then(status => {
                if (PostsService.isOkStatus(status)) {
                    PostsService.getPostById(postId).then(post => {
                        dispatch({
                            type: types.SET_POST_LIKE,
                            postId,
                            post,
                        });
                    })

                }
            });
        }

    }
}

export function unLikePost(postId, isMedia, mediaType, offset) {
    return (dispatch, getState) => {
        if(isMedia) {
            MediaPostsService.unLikePost(postId)
            .then(status => {
                if (MediaPostsService.isOkStatus(status)) {
                    dispatch(getMedia(mediaType, offset));
                    } else {

                    }
                });
           
        } else {
            PostsService.unLikePost(postId)
            .then(status => {
                if (PostsService.isOkStatus(status)) {
                    PostsService.getPostById(postId).then(post => {
                        dispatch({
                            type: types.SET_POST_LIKE,
                            postId,
                            post,
                        });
                    })
                }
            });
        }

    }
}
export function removePost(postId, fromPage, userId) {
    return (dispatch) => {
        PostsService.removePost(postId)
            .then(status => {
                if (PostsService.isOkStatus(status)) {
                    if (fromPage === 'newsFeed') {
                        PostsService.getUserNewsFeed({ limit: 20 })
                            .then(posts => {
                                dispatch({
                                    type: types.SUCCESS_GET_NEWSFEED,
                                    posts,
                                });
                            });
                    } else {
                        PostsService.getUserPosts({ userId })
                            .then(posts => {
                                dispatch({
                                    type: types.SUCCESS_GET_POSTS,
                                    posts,
                                });
                            });
                    }
    
                }
            })
    }
}

export function editPost(postId, data) {
    return (dispatch, getState) => {
        PostsService.editPost(postId, data).then(post => {
            const {posts} = getState().posts;
            const indexOfPost = posts.findIndex(post => postId === post.postId);
            const newPosts = [...posts];
            newPosts[indexOfPost] = {...newPosts[indexOfPost], text: post.text};
            dispatch({
                type : types.EDIT_POST,
                newPosts,
            });
            // console.log(post)
        });
    }
}
function updateInArray(array, findFn, updateFn) {
    const index = array.findIndex(findFn);
    const elem = array.find(findFn);
    const newArray = [...array];
    newArray.splice(index, 1, updateFn(elem));
    return newArray;
}