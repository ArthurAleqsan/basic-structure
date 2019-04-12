import Request from './Request';


class MediaService extends Request {
    constructor() {
        super('media', '/');
    }

    uploadMedia(mediaFile) {
        const options = {
            method: 'POST',
            body : JSON.stringify(mediaFile)
        };
        return this.send({path: `/upload`, options})
            .then(({status,json }) => ({status, json}));
    }
    
    getMedia(query) {
        const options = {
            method: 'GET',
        };
        return this.send({path: `?${Request.makeQuery(query)}`, options})
            .then(({json}) => ({media: json}) )
    }

}

export default new MediaService();