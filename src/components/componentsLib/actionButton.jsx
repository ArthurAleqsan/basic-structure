import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RemoveButton from '../buttons/removeButton';
import SendMessageButton from '../buttons/sendMessageButton';
import HiddenButton from '../buttons/hiddenButton';
import AddFriendButton from '../buttons/addFriendButton';
import ApproveStatusButton from '../buttons/approveStatusButton';
import PendingButton from '../buttons/pendingButton';

const ActionButton = props => {
    const { user, fromPage, friendsRequested, friendsPending, friends, currentUserCategoryId, } = props;
    const { id: userId } = user;
    const fromCategory = user.category && user.category.id === currentUserCategoryId;
    let actionButtonsStyle = '';
    let actionButtons = null;


    const relation = friendsPending.includes(userId) ? 'pending' :
        friends.includes(userId) ? 'friend' :
            friendsRequested.includes(userId) ? 'requested' :
                'unknown';

    switch (fromPage) {
        case 'search':
            actionButtonsStyle = 'search-action-button-container';
            break;
        case 'userColumn':
            actionButtonsStyle = 'userColumn-action-button-container';
            break;
    }

    switch (relation) {
        case 'pending':
            actionButtons =
                (
                    <div className={`action-button-container ${actionButtonsStyle}`}>
                        {fromCategory ? (
                            <SendMessageButton user={user} text='Message' />
                        )
                            : (
                                <HiddenButton />
                            )}
                        <PendingButton />
                    </div>
                );
            break;
        case 'friend':
            actionButtons = actionButtons = (
                <div className={`action-button-container ${actionButtonsStyle}`}>
                    <RemoveButton userId={userId} />
                    <SendMessageButton user={user} text='Message' />
                </div>
            );
            break;
        case 'requested':
            actionButtons = (
                <div className={`action-button-container ${actionButtonsStyle}`}>
                    <ApproveStatusButton text='Decline' status={false} userId={userId} />
                    <ApproveStatusButton text='Approve' status={true} userId={userId} />
                </div>
            );
            break;
        case 'unknown':
            actionButtons =
                (
                    <div className={`action-button-container ${actionButtonsStyle}`}>
                        {fromCategory ? (
                            <SendMessageButton user={user} text='Message' />
                        )
                            : (
                                <HiddenButton />
                            )}
                        <AddFriendButton userId={userId} />
                    </div>
                );
            break;
        default:
            break;


    }
    return (
        actionButtons
    )
};

ActionButton.propTypes = {
    user: PropTypes.object.isRequired,
    friendsRequested: PropTypes.array.isRequired,
    friendsPending: PropTypes.array.isRequired,
    friends: PropTypes.array.isRequired,
    currentUserId: PropTypes.string.isRequired,
    currentUserCategoryId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    const { rooms, user } = state;
    const { friends, friendsRequested, friendsPending, category: { id: currentUserCategoryId }, id: currentUserId } = user.currentUser;

    return { 
        friends, 
        friendsRequested, 
        friendsPending, 
        currentUserId, 
        currentUserCategoryId,
    };
};

export default connect(mapStateToProps)(ActionButton);