import Request from './Request';


class CategoryService extends Request {
    constructor() {
        super('oauth2','/oauth/');
    }

    login({username, password,}) {
        const options = {
            method: 'POST',
            body: `grant_type=password&username=${username}&password=${password}`
        };
        return this.send({
            path: '/token',
            options,
            headers: {
                "authorization": `Basic ${btoa('6rqh1dqvk7rft7ib6eh0alv5mu2v4f'+':'+'KJum46WoWcMynoU1CWlkhL')}`,
                "content-type": 'application/x-www-form-urlencoded',
            },
        });
    }
}

export default new CategoryService();