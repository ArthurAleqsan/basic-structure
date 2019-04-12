import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ImageBox } from '../../componentsLib/ImageBox';
import { Input } from '../../componentsLib/simpleUiComponents';

import {
    getFriendMessages, setChatWith, setText,
    sendMessage, activateMessageBar, block, unBlock, getNextMessagesNextPage
} from '../../../store/messages/messages.actions';
import Message from './Message';
import { useTranslation } from 'react-i18next/hooks';
import InfiniteScroll from './../../infiniteScroll/InfiniteScroll';

const ChatPopup = props => {
    const { close, user, messages, currentUserId, messageText, currentUserPicture,
        loadingMessages, sending, userColor, currentUserColor, blocked, blockedBy, hasMore, getNextMessagesNextPage } = props;
    const [t] = useTranslation();
    const { category, firstName, id, profilePictureUrl } = user;
    const popUpRef = useRef(null);
    const lastMsgDate = messages && messages[messages.length - 1] && messages[messages.length - 1].createdAt;
    
    useEffect(() => {
        if (messages || loadingMessages) return;
        props.getFriendMessages(id);
    });
    
    useEffect(() => {
       popUpRef.current.scrollIntoView(false);
    }, lastMsgDate);

    const setText = (text) => {
        props.setText(text);
    };

    const send = () => {
        props.sendMessage(user.id);
    };

    const block = () => {
        props.block(user.id);
    };

    const unBlock = () => {
        props.unBlock(user.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sending) return;
        send();
    };

    const focus = () => {
        props.activateMessageBar(user.id);
    };
    
    // const loadMoreMessages = () => {
    //     if (hasMore === false || loadingMessages) return;
    //     hideButton(false);
    //     getNextMessagesNextPage();
    //     popUpRef.current.scrollTo({
    //         top: 1000,
    //     });
    // };
    
    // const handleVerticalScroll = (event) => {
    //     if (hasMore === false || loadingMessages || showMoreMessages) return;
    //     const { scrollTop, scrollHeight, clientHeight } = event.target;
    //     const t = scrollTop / (scrollHeight - clientHeight);
    //
    //     if (t === 0) getNextMessagesNextPage();
    // };



    const msg = messages || [];
    const blockedByFriend = blocked && blockedBy === id;
    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog chat">
                <div className='popup-header'>
                    <div className='menu-button-container'>
                        {blockedByFriend ?
                            null :
                            <div className='menu-button' onClick={!blocked ? () => block() : () => unBlock()}>
                                {!blocked ? t('Block') : t('Unblock')}
                            </div>
                        }
                    </div>
                    <div >
                        <Link to={user.id} className='chat-header-image-container' onClick={close}>
                            <ImageBox className='chat-image' image={profilePictureUrl} borderColor={userColor} borderSize={'4px'} />
                            <div className='chat-header-info'>
                                <p className='chat-header-name'>{firstName}</p>
                                <p className='chat-header-category'>{category.name}</p>
                            </div>
                        </Link>
                    </div>

                    <div className='close-button' onClick={() => close()} />
                </div>
                <InfiniteScroll className='popup-body' 
                                hasMore={hasMore}
                                showMore={true}
                                loading={loadingMessages}
                                inverse={true}
                                handleLoadMore={() => getNextMessagesNextPage()} >
                    <div className='message-container' ref={popUpRef}>
                        {loadingMessages && <div>Loading...</div>}
                        {msg.map(message =>
                            <Message {...message}
                                key={message.id}
                                profilePictureUrl={profilePictureUrl}
                                currentUserPicture={currentUserPicture}
                                currentUserId={currentUserId}
                                userColor={userColor}
                                currentUserColor={currentUserColor}
                                showSeen={message.id === (messages[messages.length - 1]).id}
                            />
                        )}
                    </div>
                </InfiniteScroll>
                <div className='popup-footer'>
                    <form className='popup-message-input-container' onSubmit={e => handleSubmit(e)}>
                        <Input
                            className='form-input'
                            placeholder='Message text'
                            value={!blocked ? messageText : blockedByFriend ? t('The user blocked you. You can not send message') : t('You can not send message to blocked user')}
                            onChange={(name, value) => setText(value)}
                            onFocus={(e) => focus(e)}
                            disabled={blocked}
                        />
                        <i className='message-popup-smile' onClick={() => console.log('smile')} />
                        <div className='popup-message-icon-container'>
                            <div className='message-popup-send' onClick={!blocked ? () => send() : null} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

ChatPopup.propTypes = {
    close: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    messages: PropTypes.array,
    getFriendMessages: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    messageText: PropTypes.string.isRequired,
    userColor: PropTypes.string.isRequired,
    currentUserColor: PropTypes.string.isRequired,
    currentUserPicture: PropTypes.string,
    loadingMessages: PropTypes.bool.isRequired,
    sending: PropTypes.bool.isRequired,
    blocked: PropTypes.bool.isRequired,
    blockedBy: PropTypes.bool,
    activateMessageBar: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired,
    unBlock: PropTypes.func.isRequired,
    getNextMessagesNextPage: PropTypes.func.isRequired,
    seen: PropTypes.bool,
    hasMore: PropTypes.bool,
};

const mapStateToProps = state => {
    const { user, messageText, inAction, sending } = state.messages;
    const { currentUser } = state.user;
    const room = state.rooms[user.id] || {};

    return {
        user,
        messages: room.messages,
        seen: room.seen,
        hasMore: room ? room.hasMore : null,
        currentUserId: currentUser.id,
        currentUserPicture: currentUser.profilePictureUrl,
        messageText,
        loadingMessages: !!inAction,
        sending,
        userColor: user.category.color,
        currentUserColor: currentUser.category.color,
        blocked: room.blocked,
        blockedBy: room.blockedBy,
    }
};

const mapActions = (dispatch) => {
    return bindActionCreators({
        getFriendMessages,
        close: () => setChatWith(null),
        setText,
        sendMessage,
        activateMessageBar,
        block,
        unBlock,
        getNextMessagesNextPage,
    }, dispatch)
};

export default connect(mapStateToProps, mapActions)(ChatPopup);