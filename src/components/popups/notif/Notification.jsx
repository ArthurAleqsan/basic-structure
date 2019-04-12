import React from 'react';
import PropTypes from 'prop-types';
import FormatedTime from "../../formatedTime/FormatedTime";
import FriendRequest from './FriendRequest';

const Notification = (props) => {
    const {seen, createdAt, data} = props;
    return (
        <div className='notification'>
            <FriendRequest request={data}/>
            <div className='message-date'>
                <FormatedTime value={createdAt} />
                {/* {(seen) && (<p className='seen-msg-icon' >SEEN</p>)} */}
            </div>
        </div>
    )
};

Notification.propTypes = {
    createdAt: PropTypes.string.isRequired,
    picture: PropTypes.string,
    seen: PropTypes.bool.isRequired,
    data: PropTypes.any
};

export default Notification;