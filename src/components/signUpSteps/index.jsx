import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectStepCheckbox from './selectStepCheckbox';
import { Link } from 'react-router-dom';
import { SetSignUpStep } from './../../store/signUp/signUp.actions';

const SignUpSteps = props => {
    const { pathName, SetSignUpStep, step, invalidFields } = props;

    const toggleStep = id => {
        switch (id) {
            case '1/3':
                SetSignUpStep(1);
                break;
            case '2/3':
                SetSignUpStep(2);
                break;
            case '3/3':
                SetSignUpStep(3);
                break;
        }
    };
    return (
        <section className='sign-up-steps'>
            <div className='background'>
                <Link to='/'>
                    <div className='logo'>
                        <img src="/assets/images/favicon.png" alt="" />
                    </div>
                </Link>
                <div className='layer'>
                    {

                        pathName !== '/welcome/forgot-password' ?
                            (<div className="center-box" >
                                <SelectStepCheckbox
                                    hasError={invalidFields.categoryId}
                                    desc='Select Your Category' step='1/3'
                                    onClick={e => toggleStep(e.target.id)}
                                    activeStep={step}
                                />
                                <SelectStepCheckbox
                                    hasError={invalidFields.type || invalidFields.school}
                                    desc='Select School and Status' step='2/3'
                                    onClick={e => toggleStep(e.target.id)}
                                    activeStep={step}
                                />
                                <SelectStepCheckbox
                                    className='last-select-checkbox-container'
                                    hasError={invalidFields.firstName || invalidFields.lastName || invalidFields.username || invalidFields.password}
                                    desc='Personal Info' step='3/3'
                                    onClick={e => toggleStep(e.target.id)}
                                    activeStep={step}
                                />
                            </div>)
                            : null
                    }

                </div>
                <div className='sign-up-steps-desc'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incidid unt ut labore et dolore lamagna aliqua.
                            Ut enim ad minim veniam, quis nostrud exe rcitation ullamco laboris nisi ut aliquip
                            ex ea commodo uconsequat. Duis aute. irure dolor in reprehenderit in.
                    </p>
                </div>
            </div>
        </section>

    )
};
SignUpSteps.propTypes = {
    SetSignUpStep: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    pathName: PropTypes.string.isRequired,
    invalidFields: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    const { step, invalidFields } = state.signUp;
    return {
        step,
        invalidFields,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SetSignUpStep: (step) => dispatch(SetSignUpStep(step)),
    }

};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpSteps); 
