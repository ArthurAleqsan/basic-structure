import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import HeaderPublic from '../../components/headers/public';


const PublicRoute = props => {
    if (props.user) return <Redirect to={'/question'} />; 
    return(<React.Fragment>
            <section className='main-container-content sign-up-main-container-content'>
                    <section className='main-container-header'>
                        <HeaderPublic />
                    </section>
            </section>
        </React.Fragment>);
};

PublicRoute.propTypes = {
    user: PropTypes.any,
}; 

export default PublicRoute;