import React, {useState} from 'react';
import {Button, Input} from "../../../components/componentsLib/simpleUiComponents";
import {useTranslation} from "react-i18next/hooks";
import PropTypes from 'prop-types';

const ResetPasswordForm = (props) => {
    const [t] = useTranslation();

    const [password, setPassword] = useState({value: '', isValid: false});
    
    return (
        <div className='forgot-form'>
            <div className='container-header'>
                <h2>{t('Set new Password')}</h2>
            </div>
            <div className="form-group">
                <label>{t('Password')}<span>{'*'}</span></label>
                <Input
                    tabIndex={2}
                    required
                    validation='^([_a-zA-Z0-9-]{8,20})$'
                    name='password'
                    type='password'
                    borderColor='#E6E6E6'
                    value={password.value}
                    onChange={(_,value, isValid) => setPassword({value, isValid})}
                    className='form-input'
                />
            </div>
            <Button onClick={ () => props.submit(password.value)} disabled={!password.isValid}>{t('Send')}</Button>
        </div>
    )
};

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ResetPasswordForm;