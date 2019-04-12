import Request from './Request';

class PostsService extends Request {
    constructor() {
        super('posts', '/');
    }

    createNewPost(postData) {
        if (!postData.mediaArray) delete postData.mediaArray;

        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
        };
        return this.send({ path: `/`, options, }).then(({ json }) => json);
    }

    getUserNewsFeed(query) {
        const newQuery = {};
        Object.keys(query).forEach(k => {
            if (query[k] !== '') newQuery[k] = query[k];
        })

        const options = {
            method: 'GET',
        };
        return this.send({ path: `/news-feed?${Request.makeQuery(newQuery)}`, options, }).then(({ json }) => json);
    }

    getUserPosts(query) {
        const newQuery = {};
        Object.keys(query).forEach(k => {
            if (query[k] !== '') newQuery[k] = query[k];
        })
        const options = {
            method: 'GET',
        };
        return this.send({ path: `?${Request.makeQuery(newQuery)}`, options, }).then(({ json }) => json);
    }

    getPostById(postId) {
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/${postId}`, options, }).then(({ json }) => json);
    }
    addComment(postId, commentText) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ commentText })
        }
        return this.send({ path: `/${postId}/comments`, options, }).then(({ status, json }) => ({ status, comments: json }))
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

    getlikedUsersList(postId) {
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/${postId}/likes`, options, }).then(({ json }) => json);
    }

    editPost(postId, data) {
        const newData = {};
        Object.keys(data).forEach(k => {
            if (data[k] !== '') newData[k] = data[k];
        });
        const options = {
            method: 'PATCH',
            body: JSON.stringify(newData),
        };

        return this.send({ path: `/${postId}`, options, }).then(({ json }) => (json));
    }
    sharePost(postId, data) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ text: data.text, permission: data.permission }),
        }
        return this.send({ path: `/${postId}/share`, options, }).then(({ status }) => (status));
    }
    removePost(postId) {
        const options = {
            method: 'DELETE',
        };

        return this.send({ path: `/${postId}`, options, }).then(({ status }) => (status));
    }
    getComments(postId) {
        const options = {
            method: 'GET',
        };

        return this.send({ path: `/${postId}/comments`, options, }).then(({ json }) => json);
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

        return this.send({ path: `/${postId}/comments/${commentId}`, options, }).then(({ status }) => ({status}));
    }

}

export default new PostsService();