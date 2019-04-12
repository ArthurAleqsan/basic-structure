import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/hooks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Input } from './../../components/componentsLib/simpleUiComponents';
import DatePicker from 'react-datepicker';
import { SetFirstName, SetLastName, SetEmail, SetPassword, SetSex, SetBirdDay } from './../../store/signUp/signUp.actions';

const Step_three = props => {
    const { SetFirstName, SetLastName, SetEmail, SetPassword, SetSex, SetBirdDay, firstName, lastName, username, password, sex, birthday } = props;

    const [t] = useTranslation();
    const [showPassword, toogleShowingPassword] = useState(false);

    const handlerChange = (name, value, isValid) => {

        if (value) {
            switch (name) {
                case 'firstName':
                    SetFirstName(value, isValid);
                    break;
                case 'lastName':
                    SetLastName(value, isValid);
                    break;
                case 'username':
                    SetEmail(value, isValid);
                    break;
                case 'password':
                    SetPassword(value, isValid);
                    break;
            }
        }
    };

    return (
        <div className='container-body'>
            <div className='container-header'>
                <h1>{t('Sign Up')}</h1>
                <h2>{t('Personal Info')}</h2>
            </div>
            <form className='sign-up-step personal-info-step' onSubmit={e => e.preventDefault()}>
                <div className='sign-up-step-input-group'>
                    <div className="form-group">
                        <label>{t('First Name')}<span>{'*'}</span></label>
                        <Input
                            tabIndex={1}
                            required
                            name='firstName'
                            validation='^([a-zA-Z]{2,50})$'
                            value={firstName}
                            onChange={(name, value, isValid) => handlerChange(name, value, isValid)}
                            borderColor='#E6E6E6'
                            className='form-input'
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Email')}<span>{'*'}</span></label>
                        <Input
                            tabIndex={2}
                            required
                            name='username'
                            validation='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'
                            borderColor='#E6E6E6'
                            value={username}
                            onChange={(name, value, isValid) => handlerChange(name, value, isValid)}
                            className='form-input'
                        />
                    </div>

                    <div className="form-group datePicker-container">
                        <label>{t('Birthday')}</label>
                        <DatePicker
                            name='birthday'
                            className='form-input'
                            placeholderText='DD/MM/YY'
                            selected={birthday && new Date(birthday)}
                            onChange={(date) => SetBirdDay(new Date(date).toISOString())}
                            dateFormat='dd/MM/yy'
                        />

                    </div>
                </div>
                <div className='sign-up-step-input-group'>
                    <div className="form-group">
                        <label>{t('Last Name')}<span>{'*'}</span></label>
                        <Input
                            tabIndex={1}
                            required
                            validation='^([a-zA-Z]{2,50})$'
                            name='lastName'
                            value={lastName}
                            onChange={(name, value, isValid) => handlerChange(name, value, isValid)}
                            borderColor='#E6E6E6'
                            className='form-input'
                        />
                    </div>
                    <div className="form-group password-form-group">
                        <label>{t('Password')}<span>{'*'}</span></label>
                        <Input
                            tabIndex={2}
                            required
                            validation='^([_a-zA-Z0-9-]{8,20})$'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            borderColor='#E6E6E6'
                            value={password}
                            onChange={(name, value, isValid) => handlerChange(name, value, isValid)}
                            className='form-input'
                        />
                        <i onClick={() => toogleShowingPassword(!showPassword)} className='toogle-showing-password'></i>
                    </div>
                    <div className='create-step checkbox'>
                        <label>{t('Sex')}</label>

                        <Checkbox
                            id='male'
                            size='2rem'
                            backgroundColor={'#fff'}
                            border='#E6E6E6'
                            className={sex === 'male' ? 'checkbox-custom-checked' : null}
                            onClick={() => { SetSex('male') }}
                        />
                        <label className="checkbox-custom-label">{t('male')}</label>
                        <Checkbox
                            id='female'
                            size='2rem'
                            backgroundColor={'#fff'}
                            border='#E6E6E6'
                            className={sex === 'female' ? 'checkbox-custom-checked' : null}
                            onClick={() => { SetSex('female') }}
                        />

                        <label className="checkbox-custom-label">{t('female')}</label>
                    </div>

                </div>

            </form>
        </div>
    )
};

Step_three.propTypes = {
    SetFirstName: PropTypes.func.isRequired,
    SetLastName: PropTypes.func.isRequired,
    SetEmail: PropTypes.func.isRequired,
    SetPassword: PropTypes.func.isRequired,
    SetSex: PropTypes.func.isRequired,
    SetBirdDay: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    const { firstName, lastName, username, password, sex, birthday } = state.signUp;
    return {
        firstName, lastName, username, password, sex, birthday
    }
};

const mapDispatchToProps = {
    SetFirstName,
    SetLastName,
    SetEmail,
    SetPassword,
    SetSex,
    SetBirdDay
};
export default connect(mapStateToProps, mapDispatchToProps)(Step_three);