import Request from './Request';


class FriendsService extends Request {
    constructor() {
        super('friends');
    }

    getSuggestedFriends(offset, limit, friendsOfFriends) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/suggested?${Request.makeQuery({offset, limit, friendsOfFriends})}`, options})
            .then(({status,json }) => ({status, suggested : json}));
    }

    getFriends(offset, limit) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `?${Request.makeQuery({offset, limit})}`, options})
            .then(({ status, json}) => ({status, friends: json}));
    }

    sendFriendRequest(userId) {
        const options = {
            method: 'POST',
            body: JSON.stringify({userId})
        };
        return this.send({path: '/', options});
    }

    respondFriendRequest(id, status) {
        const options = {
            method: 'PUT',
            body: JSON.stringify({status})
        };
        return this.send({path: `/${id}`, options})
    }

    removeFriend(id) {
        const options = {
            method: 'DELETE',
        };
        return this.send({path: `/${id}`, options})
    }

    getFriendRequests(offset, limit) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/requested?${Request.makeQuery({offset, limit})}`, options})
        .then(({status,json }) => ({status, requested : json}));
    }

    getPendingRequests(offset, limit) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `/pending?${Request.makeQuery({offset, limit})}`, options})
        .then(({json}) => json);
    }
}

export default new FriendsService();