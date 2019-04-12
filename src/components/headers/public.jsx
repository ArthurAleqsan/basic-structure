import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from '../componentsLib/simpleUiComponents';
import { useTranslation } from 'react-i18next/hooks';

import { login } from './../../store/user/user.actions';

function HeaderPublic(props) {
    const [t] = useTranslation();
    const [form, setValues] = useState({
        username: '',
        password: ''
    });
    const login = () => {
        props.login(form);
    };
    return (
        <div className="container">
            <form className='form-inline' onSubmit={e => {
                e.preventDefault();
                login()
            }}>
                <div className='form-inline-container'>
                    <div className="form-group">
                        <label>{t('Email')}</label>
                        <Input
                            required
                            name='username'
                            borderColor='#E6E6E6'
                            value={form.username}
                            errorMessage='incorect email'
                            onChange={(name, value) => setValues({ ...form, [name]: value })}
                            className='form-input'
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Password')}</label>
                        <Input
                            required
                            name='password'
                            type='password'
                            borderColor='#E6E6E6'
                            value={form.password}
                            errorMessage='incorect Password'
                            onChange={(name, value) => setValues({ ...form, [name]: value })}
                            className='form-input'
                        />

                        <Link to='/welcome/forgot-password'>
                            <small>{t('Forgot Password')}</small>
                        </Link>
                    </div>
                    <div className = 'header-submit-container'>
                        <Button type="submit" className='form-input'>{t('Log In')}</Button>
                    </div>

                </div>
            </form>
        </div>
    )
}

HeaderPublic.propTypes = {
    login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (form) => {
            dispatch(login(form))
        },
    }
};
export default connect(null, mapDispatchToProps)(HeaderPublic);