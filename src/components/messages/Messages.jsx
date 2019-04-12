import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MessageContainer from "../componentsLib/messageContainer";

const Messages = ({rooms, close}) => {
    return (
        <div className='message-nots-popup-container'>
            {
                Object.keys(rooms).map((friendId, index )=>
                    <MessageContainer key={friendId}
                                      friendId={friendId}
                                      room={rooms[friendId]}
                                      roomsIdenficator = {index}
                                      close = {close}
                    />)
            }
        </div>
    );
};

Messages.propTypes = {
    rooms: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    const {rooms} = state;
    return {
        rooms,
    }
};

export default connect(mapStateToProps)(Messages);