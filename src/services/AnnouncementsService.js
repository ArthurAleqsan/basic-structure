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
    getListOfAnnouncements(query) {
        const newQuery = {};
        Object.keys(query).forEach(k => {
            if(query[k]) newQuery[k] = query[k];
        })
        const options = {
            method: 'GET',
        };
        return this.send({ path:`/?${Request.makeQuery(newQuery)}`, options }).then( ({ json, }) => json );
    }
    removeAnnouncement(announcementId) {
        const options = {
            method: 'DELETE',
        };
        return this.send({ path:`/${announcementId}`, options }).then( ({ status, }) => (status) );
    }
    editAnnouncement(data, announcementId) {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data), 
        };
        return this.send({ path:`/${announcementId}`, options }).then( ({ json, }) => json );
    }
}

export default new AnnouncementsService();