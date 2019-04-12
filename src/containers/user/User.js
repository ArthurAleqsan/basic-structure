import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserColumn from './userColumn';
import MainFeed from './mainFeed';
import Friends from './friends';
import UserMedia from './media/userPhotos';
import UserVideos from './media/userVideos';
import SearchFriends from './searchFriends';

const User = props => {
    const { currentUserCategoryId, userCategoryId, friendsArr, currentUserId, userId } = props;
    const isFriend = friendsArr.includes(userId);

    return (
        <section className='signIn-main-container'>
            <UserColumn />
            {(userCategoryId === currentUserCategoryId || isFriend) && (
                <Switch>
                    <Route exact path='/:id/friends' component={(Friends)} />
                    <Route exact path='/:id/photos' component={() => <UserMedia mediaType={'photo'} />} />
                    <Route exact path='/:id/videos' component={() => <UserMedia mediaType={'video'} />} />
                    <Route exact path='/:id/search' component={(SearchFriends)} />
                    <Route path='/:id' component={() => (<MainFeed currentUserId = {currentUserId} userId = {userId}/>)} />
                </Switch>
            )}

        </section>
    )
};
User.propTypes = {
    currentUserCategoryId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    userId: PropTypes.any,
    userCategoryId: PropTypes.string,
    friendsArr: PropTypes.array.isRequired,
}
const mapStateToProps = state => {
    const { currentUser, user } = state.user;
    const { friends: friendsArr, } = state.user.currentUser;
    return {
        currentUserCategoryId: currentUser.category.id,
        userCategoryId: user ? user.category.id : null,
        friendsArr,
        currentUserId : currentUser.id,
        userId : user && user.id ,
    }
};
export default connect(mapStateToProps)(User);