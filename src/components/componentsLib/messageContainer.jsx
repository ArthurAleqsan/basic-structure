import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { ImageBox } from './ImageBox';
import { getUserAndSetChatWith, activateMessageBar } from './../../store/messages/messages.actions';
import FormatedTime from './../formatedTime/FormatedTime'

const MessageContainer = (props) => {
    const { friendId, room, roomsIdenficator, close } = props;
    const handleClick = () => {
        props.getUserAndSetChatWith(friendId);
        props.activateMessageBar(friendId);
        close();
    };

    const friend = room.users.find(user => user.id === friendId);
    const { firstName, lastName, profilePictureUrl, category } = friend;
    const lastMessage = room.messages[room.messages.length - 1] || {};
    if (!lastMessage) return null;
    const subStrOfMessage = lastMessage.text && lastMessage.text.length > 30 ? lastMessage.text.substring(0, 30) + '...' : lastMessage.text;
    const smokeBackground = roomsIdenficator % 2 !== 0 ? 'smoke-background' : '';
    return (
        <div className={`popup-messageContainer ${smokeBackground} ${!lastMessage.seen ? 'unSeen-msg' : ''}`} onClick={handleClick}>
            <div className='message-nots-image-column'>
                <ImageBox className='message-nots-image' image={profilePictureUrl} borderColor={category.color} />
            </div>
            <div className='message-nots-msg-column'>
                <p className='msg-user-name'>{firstName} {lastName}</p>
                <p className='msg-text-date'>{subStrOfMessage}</p>
            </div>
            <small> <FormatedTime value={lastMessage.createdAt ? lastMessage.createdAt : room.createdAt} /></small>
        </div>
    )
};
MessageContainer.propTypes = {
    friendId: PropTypes.string.isRequired,
    room: PropTypes.object.isRequired,
    getUserAndSetChatWith: PropTypes.func.isRequired,
    activateMessageBar: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    roomsIdenficator: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserAndSetChatWith,
        activateMessageBar
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(MessageContainer);