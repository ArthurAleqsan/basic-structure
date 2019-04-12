import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { ImageBox } from "./../../componentsLib/ImageBox";
import { useTranslation } from 'react-i18next/hooks';

const FriendRequest = (props) => {
    const { request: { requesterId: request = {} }, userId } = props;
    const [t] = useTranslation();
    return (
        <div className='friend-request-notification'>

            <div className='notification-data'>
                <NavLink className='notification-link' to={`/${userId}/friends?tab=requests`}>
                    <ImageBox className='chat-image' image={request.profilePictureUrl} borderSize={'4px'} />
                    <div className = 'notification-msg'>
                        {request.firstName + t(' send you a friend request')}
                    </div>

                </NavLink>


            </div>


            {/* <div className='friend-request-notification-action-buttons'>
                <ApproveStatusButton userId={request.id} status={false} text={'Decline'} />
                <ApproveStatusButton userId={request.id} status={true} text={'Approve'} />
            </div> */}
        </div>

    )
};

FriendRequest.propTypes = {
    request: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
};

const mapProps = state => {
    const { currentUser } = state.user;
    return {
        userId: currentUser.id,
    }
};

export default connect(mapProps)(FriendRequest);