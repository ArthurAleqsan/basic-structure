import io from 'socket.io-client';

const API_MESSAGES_URL = 'http://message-api-production.us-east-1.elasticbeanstalk.com';

export default class SocketService {
    constructor(nameSpace, url = API_MESSAGES_URL) {
        this.url = url;
        this._nameSpace = nameSpace;
        this._socket = null;
        this.ready = false;
        this.connected = false;
        this.subscriptions = [];
    }

    connect() {
        return new Promise((res, rej) => {
            this._socket = io.connect(this.url);
            this.subscribe('unauthorized', (error) => {
                // handle the error
                console.log(`Authentication error: ${error.message}`)
            });
            this.subscribe('authenticated', (m) => {
                console.log('authed',m);
                this.ready = true;
                this.connected = true;
                res();
            });
            this._socket.on('connect', () => {
                this.send('authentication', {authorization: `Bearer ${localStorage.getItem('token')}`});
                
                console.log('connecting');
            });
            this._socket.on('disconnect', () => {
                this.connected = false;
            })
        });
    }

    reconnect() {
        this._socket.connect();
    }

    disconnect() {
        if (!this._socket) return;
        this._socket.disconnect();
        this.connected = false;
    }

    send(action, data, cb) {
        this._socket.emit(action, data, cb);
    }
    
    sendPromisified(action, ...data) {
        return new Promise((res, rej) => {
            this._socket.emit(action, ...data, (err, data) => {
                if (err) {
                    console.log(err);
                    rej(err);
                }
                res(data)
            })
        })
    }

    subscribe(action, cb) {
        if (!this.subscriptions.includes(action)) this.subscriptions.push(action);
        this._socket.on(action, (data) => {
            cb(data);
        })
    }
    
    subscribeOnce(action, cb) {
        this.unSubscribe(action);
        this.subscribe(action,cb);
    }
    
    unSubscribe(action) {
        this._socket.removeAllListeners(action)
    }

    unSubscribeSome(actions = []) {
        actions.forEach((ac) => this.unSubscribe(ac));
    }

    unsubscribeAll() {
        this.unSubscribeSome(this.subscriptions);
        this.subscriptions = [];
    }
}