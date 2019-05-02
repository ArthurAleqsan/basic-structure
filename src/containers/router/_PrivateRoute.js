import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { logoutRequest } from './../../store/user/user.actions';

class PrivateRoute extends Component {

    render() {
        const {  logout, component: RouteComponent, loggingIn, ...rest } = this.props;
        const hasToken = !!localStorage.getItem('token');
        const isAdmin = hasToken &&  localStorage.getItem('scope') === 'access:admin' ? true : false;
        let Component;
        if (hasToken && isAdmin) {
            Component = props => {
                return (
                    <RouteComponent {...props} logout = {logout}/>
                )
            } 
        }
        else {
            Component = () => (
                <Redirect to={{
                    pathname: '/welcome',
                    state: { from: this.props.location } 
                }}/>
            );

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
        logout : () => logoutRequest(),
        
    }
};

export default connect(
    mapProperties,
    mapActions
)(PrivateRoute);