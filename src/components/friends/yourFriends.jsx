import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ImageBox } from '../../components/componentsLib/ImageBox';
import ActionButton from '../componentsLib/actionButton';
import { Link } from 'react-router-dom';
import Loader from '../componentsLib/Loader';
import { getFriends } from '../../store/friends/friends.actions';
import { getUserFriend } from '../../store/user/user.actions';


const YourFriends = props => {
    const { items, getItems, currentUserId, getUserFriend, friendsArr, pendingsArr, requestsArr, currentUserCategoryId } = props;
    const userId = (location.pathname.split('/'))[1];
    if (currentUserId === userId && !items) {
        getItems(0);
    } 
    useEffect(() => {
        if (currentUserId !== userId ) {
            getUserFriend(userId, 0, 20);
        }
    }, []);

    let actionButtons = null;

    const userRelationWithCurrentUser = user => {
        const isFriend = friendsArr.includes(user.id);
        const isPending = pendingsArr.includes(user.id);
        const isRequested = requestsArr.includes(user.id);

        if (isFriend) {
            actionButtons = (<ActionButton user={user} page={'friend'} />);
        } else if (isPending) {
            if (currentUserCategoryId === user.category.id) {
                actionButtons = (<ActionButton user={user} fromCategory = {true} page={'pending'} />);
            } else {
                actionButtons = (<ActionButton user={user} fromCategory = {false} page={'pending'} />);
            }
        } else if (isRequested) {
            if (currentUserCategoryId === user.category.id) {
                actionButtons = (<ActionButton user={user} page={'requested'} />);
            } else {
                actionButtons = (<ActionButton user={user} page={'requested'} />);
            }
        } else {
            if (currentUserCategoryId === user.category.id) {
                actionButtons = (<ActionButton user={user} page={'noRelationFromCategory'} />)
            } else {
                actionButtons = (<ActionButton user={user} page={'noRelationFromAnotherCategory'} />);
            }
        }
        return actionButtons;
    }


    return (
        <div className='friends-body'>
            {items && items.length > 0 ? items.map(item => (
                <div key={item.id}>
                    <Link to={`/${item.id}`}>
                        <ImageBox
                            className='frends-image-container'
                            name={`${item.firstName} ${item.lastName}`}
                            image={item.profilePictureUrl}
                            users={item.category.name}
                            borderColor={item.category.color}
                        />
                    </Link>
                    {currentUserId !== item.id && userRelationWithCurrentUser(item)}
                    
                </div>

            )) : items && items.length === 0 ? (<div>You dont have a friend</div>) : (<Loader />)
            }
        </div>

    )
};
YourFriends.propTypes = {
    items: PropTypes.any,
    getItems: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    currentUserCategoryId: PropTypes.string.isRequired,
    userId: PropTypes.string,
    getUserFriend: PropTypes.func.isRequired,
    friendsArr: PropTypes.array.isRequired,
    pendingsArr: PropTypes.array.isRequired,
    requestsArr: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    const { friends: items } = state.friends;
    const { currentUser } = state.user || {};
    const { friends: friendsArr, friendsPending: pendingsArr, friendsRequested: requestsArr, } = state.user.currentUser;
    return {
        items,
        currentUserId: currentUser && currentUser.id,
        friendsArr,
        pendingsArr,
        requestsArr,
        currentUserCategoryId : currentUser.category.id,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getItems: () => dispatch(getFriends(0)),
        getUserFriend: (userId, offset, limit) => dispatch(getUserFriend(userId, offset, limit)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(YourFriends);