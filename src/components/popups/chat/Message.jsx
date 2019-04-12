import React from 'react';
import PropTypes from 'prop-types';

import { ImageBox } from "../../componentsLib/ImageBox";
import FormatedTime from '../../formatedTime/FormatedTime';

const Message = ({ writer, currentUserId, createdAt, text, seen, currentUserPicture, profilePictureUrl, userColor, currentUserColor, showSeen }) => {
    const self = writer === currentUserId;
    return <div className={self ? `user-message-container` : `guest-message-container`}>
        <ImageBox className='chat-image' image={self ? currentUserPicture : profilePictureUrl} borderColor={self ? currentUserColor : userColor} borderSize={'4px'} />
        <div className={self ? 'user-triangle' : 'guest-triangle'}>
            <img src={`/assets/images/icons/${self ? 'user-path.svg' : 'guest-path.svg'}`} />
        </div>
        <div className='message-and-date'>
            <div className='chat-message'>
                {text}
            </div>
            <div className='message-date'>
                <FormatedTime value={createdAt} />
                {(self && showSeen && seen) && (<p className='seen-msg-icon'></p>)}
            </div>
        </div>
    </div>
};

Message.propTypes = {
    writer: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    currentUserPicture: PropTypes.string,
    profilePictureUrl: PropTypes.string,
    userColor: PropTypes.string.isRequired,
    currentUserColor: PropTypes.string.isRequired,
    showSeen: PropTypes.bool.isRequired,
    seen: PropTypes.bool.isRequired,
};

export default Message