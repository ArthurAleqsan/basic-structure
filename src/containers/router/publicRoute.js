import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import HeaderPublic from '../../components/headers/public';
import SignUpSteps from '../../components/signUpSteps';


const PublicRoute = props => {
    if (props.user) return <Redirect to={'/'} />; 
    const { children, ...rest } = props;
    return(<React.Fragment>
            <SignUpSteps pathName = {props.location.pathname}/>
            <section className='main-container-content sign-up-main-container-content'>
                    <section className='main-container-header'>
                        <HeaderPublic />
                    </section>
                    <Route {...rest}>{children}</Route>
            </section>
        </React.Fragment>);
};

PublicRoute.propTypes = {
    user: PropTypes.any,
    children: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.object,
}; 

export default PublicRoute;