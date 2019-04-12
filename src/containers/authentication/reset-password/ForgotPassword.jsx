import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/hooks';
import { Input, Button } from './../../../components/componentsLib/simpleUiComponents';
import BasicPopup from './../../../components/popups/basicPopup';
import UserService from './../../../services/UserService';

const ForgotPassword = () => {
    const [t] = useTranslation();
    const [username, setEmail] = useState('');
    const [state, setState] = useState({ popup: null });
    const closePopUp = () => setState({ popup: null });

    const handlerSubmit = e => {
        e.preventDefault();
        if (username === '') {
            alert('invalid email');
        } else {
            UserService.forgetPassword(username);
            setState({
                popup: <BasicPopup
                    close={closePopUp}
                    userMail='https://mail.google.com'
                    sendEmail={() => UserService.forgetPassword(username)}
                />
            });
        }

    };
                return (
                    <div className='forgot-container-body'>
                        <div className='container-header'>
                            <h1>{t('Forgot Password')}</h1>
                            <h2>{t('write your email and we will send you link')}</h2>
                        </div>
                        <div className='forgot-form-container'>
                            <form className='forgot-form' onSubmit={handlerSubmit} >
                                <label>{t('Email')}<span>*</span></label>
                                <Input
                                    required
                                    name='username'
                                    validation='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'
                                    borderColor='#E6E6E6'
                                    value={username}
                                    errorMessage={'Incorect Email'}
                                    onChange={(name, value) => setEmail(value)}
                                    className='form-input'
                                />
                                <Button type="submit">{t('Send')}</Button>
                            </form>
                        </div>
                        {state.popup}
                    </div>)

};

export default ForgotPassword;
