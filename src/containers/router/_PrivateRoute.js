import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getUser ,logoutRequest } from './../../store/user/user.actions';

class PrivateRoute extends Component {

    render() {
        const { getUser, logout, component: RouteComponent, user, loggingIn,  ...rest } = this.props;
        const hasToken = !!localStorage.getItem('token');
        const isMember = hasToken &&  localStorage.getItem('scope') === 'access:member' ? true : false;
        let Component;
        if (user) {
            Component = props => {
                return (
                    <RouteComponent {...props}/>
                )
            } 
        } else if (hasToken && isMember) {
            Component = () => (
                <div></div>
            );
        } 
        else {
            Component = () => (
                <Redirect to={{
                    pathname: '/welcome',
                    state: { from: this.props.location }
                }}/>
            );

        }
        //if(hasToken && !loggingIn){
        //    logout();
        //}
        if (!user && hasToken) {
            getUser();
        }

        return (
            <Route {...rest} render={ props => Component(props) } />
        );
    }
}

const mapProperties = (state, ownProps) => {
    const { currentUser, loggingIn, } = state.user;
    return {
        user: currentUser,
        loggingIn,
        ...ownProps
    }
};

const mapActions = (dispatch) => {
    return {
        getUser: () => {
            dispatch(getUser());
        },
        logout(){
            dispatch(logoutRequest())
        }
    }
};

export default connect(
    mapProperties,
    mapActions
)(PrivateRoute);