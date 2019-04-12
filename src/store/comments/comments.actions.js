import * as types from "./../types";
import MediaPostsService from "./../../services/MediaPostsService";
import PostsService from "./../../services/PostsService";

export function addComment(id, comment, fromPage, isPostImage) {
    return (dispatch, getState) => {
        if (fromPage === 'mediaPopup') {
            return MediaPostsService.addComment(id, comment).then((resp) => {
                const { status, } = resp;
                if (MediaPostsService.isOkStatus(status)) {
                    dispatch(getComments(id));
                    if(!isPostImage) {
                        const { media,} = getState().media;
                        let newMedia = media;
                        const findFn = (e) => e.mediaId === id;
                        const updateFn = (el) => ({ ...el, commentCount: el.commentCount + 1 });
                        newMedia = updateInArray(newMedia, findFn, updateFn);
                        
                        dispatch({
                            type: types.SET_MEDIA,
                            media: newMedia,
                        });
                    } else {

                    }
                }
            });
        } else {
            return PostsService.addComment(id, comment).then((resp) => {
                const { status, } = resp;
                if (PostsService.isOkStatus(status)) {
                    dispatch(getComments(id, fromPage)).then(() => {
                        const { newsFeed, posts } = getState().posts;
                        let newNewsFeed = newsFeed;
                        let newPosts = posts;
                        const findFn = (e) => e.postId === id;
                        const updateFn = (el) => ({ ...el, commentCount: el.commentCount + 1 });
                        if (fromPage === 'newsFeed') {
                            newNewsFeed = updateInArray(newNewsFeed, findFn, updateFn);
                        } else if (fromPage === 'userPosts') {
                            newPosts = updateInArray(newPosts, findFn, updateFn);
                        }

                        dispatch({
                            type: types.SET_POSTS_AND_NEWSFEED,
                            newsFeed: newNewsFeed,
                            posts: newPosts,
                        });
                    });
                }
            });

        }

    }
}
export function getComments(id, fromPost) {
    return (dispatch) => {
        if (fromPost) {
            return PostsService.getComments(id)
                .then(comments => {
                    dispatch({
                        type: types.GET_COMMENTS_SUCCESS,
                        id,
                        data: {
                            comments,
                        }
                    });
                })
        } else {
            return MediaPostsService.getComments(id)
                .then(comments => {
                    dispatch({
                        type: types.GET_COMMENTS_SUCCESS,
                        id,
                        data: {
                            comments,
                        }
                    });
                });
        }
    }
}
export function editComment(postId, commentId, commentText, isPostComment) {
    if (isPostComment) {
        return (dispatch) => {
            PostsService.editComment(postId, commentId, commentText)
                .then((comment) => {
                    dispatch(getComments(postId))
                        .then(() => {
                            dispatch({
                                type: types.SUCCESS_EDIT_COMMENT,
                                postId,
                                commentId,
                                data: {
                                    comments: comment,
                                }

                            });
                        });
                });
        }
    }
}
export function removeComment(postId, commentId, fromPage, isPostImage) {
    if (fromPage === 'mediaPopup') {
        return (dispatch, getState) => {
            MediaPostsService.removeComment(postId, commentId)
                .then(() => {
                    dispatch(getComments(postId));
                    if(!isPostImage) {
                        const { media,} = getState().media;
                        let newMedia = media;
                        const findFn = (e) => e.mediaId === postId;
                        const updateFn = (el) => ({ ...el, commentCount: el.commentCount - 1 });
                        newMedia = updateInArray(newMedia, findFn, updateFn);
                        
                        dispatch({
                            type: types.SET_MEDIA,
                            media: newMedia,
                        });
                    } else {

                    }

                });
        }
    }
    else {
        return (dispatch, getState) => {
            PostsService.removeComment(postId, commentId)
                .then(() => {
                    const { newsFeed, posts } = getState().posts;
                    dispatch(getComments(postId, true));
                    let newNewsFeed = newsFeed;
                    let newPosts = posts;
                    const findFn = (e) => e.postId === postId;
                    const updateFn = (el) => ({ ...el, commentCount: el.commentCount - 1 });
                    if (fromPage === 'newsFeed') {
                        newNewsFeed = updateInArray(newNewsFeed, findFn, updateFn);
                    } else if (fromPage === 'userPosts') {
                        newPosts = updateInArray(newPosts, findFn, updateFn);
                    }

                    dispatch({
                        type: types.SET_POSTS_AND_NEWSFEED,
                        newsFeed: newNewsFeed,
                        posts: newPosts,
                    });
                });
        }
    }
}

function updateInArray(array, findFn, updateFn) {
    const index = array.findIndex(findFn);
    const elem = array.find(findFn);
    const newArray = [...array];
    newArray.splice(index, 1, updateFn(elem));
    return newArray;
}


