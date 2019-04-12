import SocketService from './SocketService';

const MESSAGES_LIMIT = 10;
const API_NOTIFICATIONS_URL = 'http://notifications-api.5uyr4m7f5p.us-west-2.elasticbeanstalk.com/';

class MessagesService extends SocketService {

    constructor(nameSpace = '/'){
        super(nameSpace, API_NOTIFICATIONS_URL);
    }
    
    getUnseenNotificationsCount() {
        return this.sendPromisified('get-non-seen-notifications-count').then( data => {
            console.log('notif-count...', data);
            return data.count;
        }).catch((e) => e);
    }


    getNotifications() {
        return this.sendPromisified('get-notification-list', {offset: 0 , limit: 20}).then( data => {
            console.log('notifications...', data);
            return data;
        }).catch((e) => e);
    }
    
    subscribeForNotifications(cb) {
        this.subscribeOnce('not', (data) => {
            console.log('get message', data);
            cb(data);
        });
    }

    setSeen(notificationId) {
        return this.sendPromisified('set-notification-seen', notificationId)
    }

    init() {
        if(this.ready && !this.connected){
            this.reconnect();
        }
        if(!this.ready){
            return this.connect().then( () => {
                return this.getUnseenNotificationsCount();
            })
        }else {
            return this.getUnseenNotificationsCount();
        }
    }
}

const instance = new MessagesService();

export default instance;