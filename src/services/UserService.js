import Request from './Request';

const changableFields = [
    'subcategoryId', 'subcategoryCustom', 'firstName', 'lastName', 'sex', 'birthday', 'country', 'city',
    'education', 'name', 'position', 'phone', 'bio', 'profilePictureUrl', 'coverPictureUrl', 'state',
];

class UserService extends Request {
    constructor() {
        super('users');
    }
    registerUser(userData) {
        const data = {
            // type: 'TEACHER',
        };
        Object.keys(userData).forEach(k => {
            if (userData[k] !== '') data[k] = userData[k];
        });
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        return this.send({ path: `/`, options, }).then(({ json }) => json);
    }

    getUser() {
        const options = {
            method: 'GET',
        };
        return this.send({ path: '/current', options })
    }

    getUserById(id) {
        const options = {
            method: 'GET',
        };

        return this.send({ path: `/${id}`, options }).then(({ status, json }) => {
            return { status, user: json };
        })
    }
    forgetPassword(username) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ username }),
        };
        return this.send({ path: `/forgot-password`, options, });
    }

    resetPassword({ username, expiryDate, key, password }) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ username, expiryDate, key, password }),
        };
        return this.send({ path: `/reset-password`, options });
    }

    reSendActivationEmail(username) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ username }),
        };
        return this.send({ path: `/resend-activation`, options, });
    }
    updatePassword(password) {
        const { oldPassword, newPassword } = password;
        const options = {
            method: 'PUT',
            body: JSON.stringify({ oldPassword, newPassword }),
        };
        return this.send({ path: `/current/password`, options, });
    }

    activate({ username, expiryDate, key }) {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                username,
                expiryDate,
                key,
            })
        };
        return this.send({ path: '/activation', options })
    }
    changeUserFields(userData) {
        const data = {};
        changableFields.forEach(k => {
            if (userData[k]) data[k] = userData[k];
        });
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data)
        };
        return this.send({ path: '/current', options }).then(({ status, json }) => ({ status, currentUser: json }))
    }
    searchUser(searchedQuery) {
        const query = {};
        Object.keys(searchedQuery).forEach(k => {
            if (searchedQuery[k] !== '') query[k] = searchedQuery[k];
        });
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/search?${Request.makeQuery(query)}`, options }).then(({ json }) => json);

    }
    getUserFriend(userId, offset, limit) {
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/${userId}/friends?${Request.makeQuery({ offset, limit })}`, options })
            .then(({ status, json }) => ({ status, friends: json }));
    }
}

export default new UserService();