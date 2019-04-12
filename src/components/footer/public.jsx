import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/hooks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SetSignUpStep, registerUser, reSendActivationEmail, setInvalidFields } from './../../store/signUp/signUp.actions';
import BasicPopup from '../popups/basicPopup';

const FooterPublic = props => {
    const [t] = useTranslation();
    const {
        SetSignUpStep,
        step,
        categoryId,
        subcategoryId,
        subcategoryCustom,
        type,
        country,
        city,
        state,
        position,
        firstName,
        lastName,
        username,
        password,
        sex,
        birthday,
        setInvalidFields,
        invalidFields,
        education
    } = props;
    const [initialState, setState] = useState({ popup: null });
    const closePopUp = () => setState({ popup: null });


    const handlePagination = step => {

        SetSignUpStep(step);

        if (step > 3) {
            SetSignUpStep(3);
            const userData = {
                categoryId,
                subcategoryId,
                subcategoryCustom,
                type,
                country,
                city,
                state,
                position,
                firstName,
                lastName,
                username,
                password,
                sex,
                birthday,
                education,
            };
            const requiredFields = {
                categoryId: userData.categoryId,            
                type: userData.type,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                password: userData.password,
                school: userData.education.name
            };
            subcategoryCustom ? requiredFields.subcategoryCustom = userData.subcategoryCustom : requiredFields.subcategoryId = userData.subcategoryId,
            Object.keys(requiredFields).forEach(k => {
                if (requiredFields[k] === '') {
                    invalidFields[k] = true;
                }
            });

            if (userData.categoryId && (userData.subcategoryId || userData.subcategoryCustom) && userData.type && userData.firstName && userData.lastName && userData.username && userData.password) {
                registerUser(userData);
                setState({
                    popup: <BasicPopup
                        close={closePopUp}
                        sendEmail={() => reSendActivationEmail(username)}
                    />
                });
            }
            else {
                setInvalidFields(invalidFields);
            }

        }
    };

    return (
        <div className='container-footer'>

            <div style={step === 1 ? { visibility: 'hidden' } : null} className='container-footer-pagination' onClick={() => handlePagination(step - 1)}>
                <div className='hl'></div>
                <div className='pagination-label'>{t('Previous')}</div>
                <div className='pagination-underline'></div>
            </div>
            <div className='container-footer-pagination' onClick={() => handlePagination(step + 1)}>
                <div className='pagination-label'>{step === 3 ? t('Finish') : t('Next')}</div>
                <div className='hl'></div>
                <div className='pagination-underline'></div>
            </div>
            {initialState.popup}
        </div>
    )

};
FooterPublic.propTypes = {
    SetSignUpStep: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    categoryId: PropTypes.string.isRequired,
    subcategoryId: PropTypes.string,
    subcategoryCustom: PropTypes.string,
    type: PropTypes.string.isRequired,
    country: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    position: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    education: PropTypes.object.isRequired,
    setInvalidFields: PropTypes.func.isRequired,
    invalidFields: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    const { step, categoryId, subcategoryId, subcategoryCustom,
        type, country, city, position, firstName, lastName, username, password, sex, birthday, invalidFields, education } = state.signUp;
    return {
        step,
        categoryId,
        subcategoryId,
        subcategoryCustom,
        type,
        country,
        city,
        state : state.signUp.state,
        position,
        firstName,
        lastName,
        username,
        password,
        sex,
        birthday,
        invalidFields,
        education,
    }

};
const mapDisptachToProps = dispatch => {
    return {
        SetSignUpStep: (step) => dispatch(SetSignUpStep(step)),
        setInvalidFields: (invalidData) => dispatch(setInvalidFields(invalidData)),
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(FooterPublic);