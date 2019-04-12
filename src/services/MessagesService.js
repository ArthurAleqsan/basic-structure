import SocketService from './SocketService';

const MESSAGES_LIMIT = 10;

class MessagesService extends SocketService {
    
    constructor(nameSpace = '/'){
        super(nameSpace);
        this._rooms = new Map([]);
    }

    _setRooms(rooms) {
        const roomsObj = {};
        rooms.forEach( (room) => {
            const friend = room.users.find( user => user.id !== this._userId);
            if (!friend) return; 
            const friendId = friend.id;
            if (this._rooms.get(friendId)) return;
            this._rooms.set(friendId, room.id);
            roomsObj[friendId] = room;
        });
        return roomsObj;
    }
    
    async _openRoom(friendId, cb) {
        const payload = {friendId};
        console.log('oppening room');
        return this.sendPromisified('add-room', payload).then((data) => {
            console.log('add-room...', data);
            const { id: roomId } = data;
            this._rooms.set(friendId, roomId);
            return roomId;
        }).catch(e => {
            throw e
        });
    }

    _sendMessage(roomId, text, cb) {
        const payload = {roomId, text};
        return this.sendPromisified('add-message', payload).then((data) => {
            console.log('add-message...', data);
            return data;
        })
    }


    set userId(id) {
        if (typeof id !== "string" || !id) throw TypeError('id must be non empty string');
        this._userId = id;
    }
    
    _getRooms(limit) {
        return this.sendPromisified('list-rooms', {offset:0, limit}).then( data => {
            console.log('list-rooms...', data);
            return this._setRooms(data);
        }).catch((e) => e);
    }    
    
    async _getRoomId(friendId) {
        const roomId = this._rooms.get(friendId) || await this._openRoom(friendId);
        return roomId;
    }
    
    _getExistingRoomId(friendId) {
        return this._rooms.get(friendId);
    }    
    
    _getExistingRoomFriendId(roomId){
        const indexOfRoomId = Array.from(this._rooms.values()).indexOf(roomId);
        return Array.from(this._rooms.keys())[indexOfRoomId];
    }
    
    block(friendId) {
        const roomId = this._getExistingRoomId(friendId);
        return this.sendPromisified('set-room-blocked', {roomId})
    }
    
    unblock(friendId) {
        const roomId = this._getExistingRoomId(friendId);
        return this.sendPromisified('set-room-unblocked', {roomId})
    }
    
    async sendMessage(friendId, text) {
        const roomId = this._rooms.get(friendId) || await this._openRoom(friendId);
        return this._sendMessage(roomId, text);
    }
    
    async getRoom_old(friendId, limit = MESSAGES_LIMIT) {
        const roomId = await this._getRoomId(friendId);
        return this.sendPromisified('get-room', {roomId, limit})
    }
    
    async getRoom(friendId, limit = MESSAGES_LIMIT) {
        return this.sendPromisified('get-room-by-user-id', {friendId, limit}).then(
            (_) => _
        ).catch(
            () => this.getRoom_old(friendId,limit)
        )
    }
    
    
    subscribeMessages(cb) {
        this.subscribeOnce('message', (data) => {
            console.log('get message', data);
            cb(data);
        });
        this.subscribeOnce('message-seen', (data) => {
            console.log('message seen', data);
            const {messageId, roomId} = data;
            const friendId = this._getExistingRoomFriendId(roomId);
            if (friendId) {
                cb({message: {id: messageId, seen: true}}, false, friendId);
            }  
        })
    }
    
    subscribeBlocked(cb) {
        this.subscribeOnce('room-blocked', ({roomId}) => {
            console.log('room-block', roomId);
            const friendId = this._getExistingRoomFriendId(roomId);
            if (this._getExistingRoomFriendId(roomId)) {
                cb(true, friendId)
            }
        });
        
        this.subscribeOnce('room-unblocked', ({roomId}) => {
            console.log('room-block', roomId);
            const friendId = this._getExistingRoomFriendId(roomId);
            if (this._getExistingRoomFriendId(roomId)) {
                cb(false, friendId)
            }
        })
    }
    
    setSeen(friendId, messageId) {
        const roomId = this._rooms.get(friendId);
        if (!roomId) throw 'no room found';
        const payload = {roomId, messageId};
        return this.sendPromisified('set-message-seen', payload);
    }
    
    init(id, limit) {
        this.userId = id;
        if(this.ready && !this.connected){
            this.reconnect();
        }
        if(!this.ready){
            return this.connect().then( () => {
                return this._getRooms(limit);
            })
        }else {
            return this._getRooms(limit);
        }
    }
}

const instance = new MessagesService();

export default instance;