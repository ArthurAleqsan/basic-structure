import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import Messages from '../messages/Messages';
import { getMoreRooms } from '../../store/messages/messages.actions';

const MessageNotsPopup = props => {
    const { close, currentUserId, getMoreRooms, rooms} = props;
    let roomsLength = Object.keys(rooms).length;
    const [t] = useTranslation();
    const [limit, setLimit] = useState(12);
    const [isShowMore, showMoreWithScroll] = useState(false);
    const [prevScrollhHight, setScrollHeight] = useState(null);
    const [countOfRooms, setCount] = useState(roomsLength);

    const getMoreChatRooms = () => {
        getMoreRooms(currentUserId, limit);
        setLimit(limit + 1);
        showMoreWithScroll(true);
        setCount(roomsLength);
    };
    

    const handleVerticalScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        setScrollHeight(scrollHeight - clientHeight);

        if (isShowMore && scrollTop === (scrollHeight - clientHeight)) {
            setCount(roomsLength);
            if (prevScrollhHight === (scrollHeight - clientHeight) && roomsLength !== countOfRooms) {
                getMoreRooms(currentUserId, limit);
                setLimit(limit + 6);
            }
        }
    };

    return (
        <div className="popup msg-nots-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog">
                <div className='popup-header'>
                    <p className='header-text'>{t('Messages')}</p>
                </div>
                <div className='popup-body' onScroll={(e) => handleVerticalScroll(e)}>
                    <Messages close={close} />
                </div>
                {roomsLength < 6 && (
                    <div className='popup-footer'>
                        <p className='footer-text' onClick={getMoreChatRooms}>{t('See more messages')}</p>
                    </div>
                )}
            </div>
        </div>
    )
};
MessageNotsPopup.propTypes = {
    close: PropTypes.func.isRequired,
    getMoreRooms: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    rooms: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    const { currentUser, } = state.user;
    return {
        currentUserId: currentUser.id,
        rooms: state.rooms,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getMoreRooms: (currentUserId, limit) => dispatch(getMoreRooms(currentUserId, limit)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageNotsPopup);
