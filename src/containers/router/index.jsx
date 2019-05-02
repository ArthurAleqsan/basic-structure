import React, { Component} from 'react';
import { Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import App from './App';
import PrivateRoute from './_PrivateRoute';
import PublicRoute from './publicRoute';


const PUBLIC_PATH = '/welcome';
class Router extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const hasToken = localStorage.getItem('token');
        const ACCESS_ADMIN = localStorage.getItem('scope') === "access:admin" ? true : false;
        return (
            <div className='main-container'>
                <Switch>       
                    <PublicRoute hasToken={ hasToken } isAdmin = {ACCESS_ADMIN} path={PUBLIC_PATH} />
                    <PrivateRoute path='/' component={App} />
                </Switch>
            </div>
        );
    }
}
Router.propTypes = {
    user: PropTypes.any,
};
const mapStateToProps = (store) => {
    const { currentUser } = store.user;
    return {
        user: currentUser,
    }
};
export default withRouter(connect(mapStateToProps, () => ({}))(Router));
