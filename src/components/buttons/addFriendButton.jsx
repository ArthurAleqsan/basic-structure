import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../componentsLib/simpleUiComponents';
import { addFriendRequest, getFriends, getPending } from '../../store/friends/friends.actions';

const AddFriendButton = props => {
    const { addFriendRequest, userId, getPending } = props;

    const handleAddButton = () => {
        addFriendRequest(userId);
        getPending();
    };
    return (
        <div>
            <Button className = 'btn add-btn' onClick={handleAddButton} iconImagePath = '/assets/images/icons/add-friend.svg'>
                Add
            </Button>
        </div>
    )
};

AddFriendButton.propTypes = {
    addFriendRequest: PropTypes.func.isRequired,
    getPending: PropTypes.func.isRequired,
    userId: PropTypes.string,
};

const mapStateToProps = state => {
    const { friends: friendsArr, friendsPending: pendingsArr, } = state.user.currentUser;
    return {
        friendsArr,
        pendingsArr,
    }
};

const mapDispatchToProps = dispatch => ({
    addFriendRequest: (userId) => dispatch(addFriendRequest(userId)),
    getFriends: () => dispatch(getFriends(0)),
    getPending: () => dispatch(getPending(0)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddFriendButton);
