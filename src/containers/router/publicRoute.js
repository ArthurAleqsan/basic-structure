import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import HeaderPublic from '../../components/headers/public';


const PublicRoute = props => {
    const {hasToken, isAdmin, history} = props;
    if (hasToken && isAdmin) history.push('/create_a_announcement'); 
    return(<React.Fragment>
            <section className='main-container-content sign-up-main-container-content'>
                    <section className='main-container-header'>
                        <HeaderPublic />
                    </section>
            </section>
        </React.Fragment>);
};

PublicRoute.propTypes = {
    hasToken: PropTypes.bool,
    isAdmin: PropTypes.bool,
    history: PropTypes.object,
}; 

export default withRouter(PublicRoute);