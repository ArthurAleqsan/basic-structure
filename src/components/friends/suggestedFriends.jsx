import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ImageBox } from '../componentsLib/ImageBox';
import Loader from '../componentsLib/Loader';
import ActionButton from '../componentsLib/actionButton';
import { getSuggested } from '../../store/friends/friends.actions';
import { Link } from 'react-router-dom';

const SuggestedFriends = props => {
    const { items, getItems, currentUserCategoryId, userCategoryId, friendsArr, } = props;
    if (!items) {
        friendsArr.length > 0 ? getItems(0, 10, true) : getItems(0, 10, false);
    }
    return (
        <div className='friends-body suggested'>
            {items && items.length > 0 ? items.map(item => (

                <div key={item.id} >
                    <Link to={`/${item.id}`}>
                        <ImageBox
                            className='frends-image-container'
                            name={`${item.firstName} ${item.lastName}`}
                            image={item.profilePictureUrl}
                            users={item.category.name}
                            borderColor={item.category.color}
                        />
                    </Link>
                    <ActionButton user={item} page='suggestedFriends' fromCategory = {currentUserCategoryId === userCategoryId ? true : false} />
                </div>
            )) :
                items && items.length === 0 ? (<div>You dont have a friend</div>) : (<Loader />)
            }



        </div>
    )
};
SuggestedFriends.propTypes = {
    items: PropTypes.array,
    getItems: PropTypes.func.isRequired,
    currentUserCategoryId: PropTypes.string.isRequired, 
    userCategoryId: PropTypes.string.isRequired,
    friendsArr: PropTypes.array.isRequired,
};
const mapStateToProps = state => {
    const { suggested: items } = state.friends;
    const { currentUser, user } = state.user || {};
    const { friends: friendsArr, } = state.user.currentUser;
    return {
        items,
        friendsArr,
        currentUserCategoryId: currentUser.category.id,
        userCategoryId: user && user.category.id,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getItems: (offset, limit, friendsOfFriend) => dispatch(getSuggested(offset, limit, friendsOfFriend)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFriends);
