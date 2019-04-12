import React, { Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import App from './App';
import PrivateRoute from './_PrivateRoute';
import PublicRoute from './publicRoute';

import Authentication from '../authentication';
import ForgotPassword from '../authentication/reset-password/ForgotPassword';
import ResetPassword from '../authentication/reset-password/ResetPassword';
import Activate from './../authentication/Activate';

const PUBLIC_PATH = '/welcome';
class Router extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <div className='main-container'>
                <Switch>       
                    <PublicRoute user={ this.props.user } path={PUBLIC_PATH} >
                        <Switch>
                            <Route path={`${PUBLIC_PATH}/forgot-password`} component={(ForgotPassword)} />
                            <Route path={`${PUBLIC_PATH}/reset-password`} component={(ResetPassword)} />
                            <Route path={`${PUBLIC_PATH}/test`} component={(Authentication)} />
                            <Route path={`${PUBLIC_PATH}/activation`} component={(Activate)} />
                            <Route path={`${PUBLIC_PATH}`} component={(Authentication)} />
                        </Switch>
                    </PublicRoute>
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
