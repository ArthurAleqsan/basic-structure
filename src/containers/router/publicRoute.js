import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import HeaderPublic from '../../components/headers/public';


const PublicRoute = props => {
    if (props.hasToken && props.isAdmin) props.history.push('/question'); 
    return(<React.Fragment>
            <section className='main-container-content sign-up-main-container-content'>
                    <section className='main-container-header'>
                        <HeaderPublic />
                    </section>
            </section>
        </React.Fragment>);
};

PublicRoute.propTypes = {
    hasToken: PropTypes.any,
}; 

export default withRouter(PublicRoute);