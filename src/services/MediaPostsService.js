import Request from './Request';

class MediaPostsService extends Request {
    constructor() {
        super('media', '/');
    }
    addComment(postId, commentText) {
        // console.log({mediaId, commentText});
        const options = {
            method: 'POST',
            body: JSON.stringify({ commentText })
        }
        return this.send({ path: `/${postId}/comments`, options, }).then(({ status, json }) => ({ status, comments: json }))
    }
    getComments(postId) {
        const options = {
            method: 'GET',
        };

        return this.send({ path: `/${postId}/comments`, options, }).then(({ json }) => json);
    }
    likePost(postId) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ postId }),
        };
        return this.send({ path: `/${postId}/likes`, options, }).then(({ status }) => (status));
    }
    unLikePost(postId) {
        const options = {
            method: 'DELETE',
        };

        return this.send({ path: `/${postId}/likes`, options, }).then(({ status }) => (status));
    }
    editComment(postId, commentId, commentText) {

        const options = {
            method: 'PATCH',
            body: JSON.stringify({ commentText }),
        };

        return this.send({ path: `/${postId}/comments/${commentId}`, options, }).then(({ json }) => (json));
    }
    removeComment(postId, commentId,) {

        const options = {
            method: 'Delete',
        };

        return this.send({ path: `/${postId}/comments/${commentId}`, options, }).then(({ status }) => (status));
    }
}

export default new MediaPostsService();