import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import SugestedFriends from './sugestedFriendsColomn';
import CreatePost from './../../components/posts/createPost';
import UserPosts from './posts/userPosts';
import NewsFeed from './posts/newsFeed'; ///TODO use same component for newsfeed and user posts



const MainFeed = props => {
    const { currentUserId, userId } = props;

    return (
        <section className='newsFeed-container'>
            <div className='column center-column'>
                <CreatePost />
                <Switch>
                    <Route exact path='/:id/posts' component={(UserPosts)} />
                    <Route path='/:id' component={currentUserId === userId ? (NewsFeed) : (UserPosts)} />  
                </Switch>
            </div>

            <SugestedFriends />
        </section>
    )
};
MainFeed.propTypes = {
    currentUserId: PropTypes.string.isRequired, 
    userId: PropTypes.string.isRequired,
};
export default MainFeed;