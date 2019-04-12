import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FooterPublic from '../../components/footer/public';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import Loader from '../../components/componentsLib/Loader';


const SignIn = props => {
    const { step } = props
    let stepComponent = null;
    switch (step) {
        case 1:
            stepComponent = <StepOne />;
            break;
        case 2:
            stepComponent = <StepTwo />;
            break;
         default:
            stepComponent = <StepThree />;
            break;
    }
    return (
        <section className='sign-up-body'>
            <div className='container'>
                <div className='sign-up-body-container'>
                    <Suspense fallback={<Loader />}>
                        {stepComponent}
                    </Suspense>
                    <FooterPublic />
                </div>
            </div>
        </section>
    );
}

SignIn.propTypes = {
    step: PropTypes.number.isRequired,
}
const mapStateToProps = state => ({
    step: state.signUp.step
});
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
