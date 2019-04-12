import Request from './Request';


class AnnouncementsService extends Request {
    constructor() {
        super('announcements','/');
    }
    createAnnouncement(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data), 
        };
        return this.send({ path:'/', options }).then( ({ json, }) => json );
    }
    getAnnouncement() {
        const options = {
            method: 'GET',
        };
        return this.send({ path:'/active', options }).then( ({ json, }) => json );
    }

}

export default new AnnouncementsService();