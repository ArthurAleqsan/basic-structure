import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import NewsFeed from './User';

const MainContainer = (props) => {
    return (
        <Switch>
            <Route path='/:id' component={(NewsFeed)}/>
            <Redirect to={props.currentUserId}/>
        </Switch>
    )
};

const mapStateToProps =  (state) => {
    const {currentUser} = state.user;
    return {
        currentUserId: currentUser.id
    }
};

MainContainer.propTypes = {
    currentUserId : PropTypes.string,
};
export default connect(mapStateToProps)(MainContainer);