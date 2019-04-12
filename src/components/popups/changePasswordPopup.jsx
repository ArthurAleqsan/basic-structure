import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Input, Button } from '../componentsLib/simpleUiComponents';
import { updatePassword } from '../../store/user/user.actions';

const ChangePassword = props => {
    const { close } = props;
    const [t] = useTranslation();
    const [userPasword, setPasword] = useState({
        oldPassword : '',
        newPassword : '',
        confirmPassword: ''
    })
    const [borderColor, setBorderColor] = useState('#E6E6E6');

    const saveNewPassword = e => {
        e.preventDefault();
        if (userPasword.oldPassword === userPasword.oldPassword && userPasword.newPassword === userPasword.confirmPassword) {
            updatePassword(userPasword);
            close();
        } else {
            setBorderColor('red');
        }

    }
    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog setPasword">
                <div className='popup-header'>{t('Change Password')}</div>
                <form className='popup-form' onSubmit={saveNewPassword}>
                    <div className='popup-body'>

                        <div className="form-group">
                            <label>{t('Old Password')}<span>*</span></label>
                            <Input
                                required
                                validation='^([_a-zA-Z0-9-]{8,20})$'
                                name='oldPassword'
                                type='password'
                                borderColor={borderColor}
                                value={userPasword.oldPassword}
                                onChange={(name, value) => setPasword({ ...userPasword, [name]: value })}
                                className='form-input'
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('New Password')}<span>*</span></label>

                            <Input
                                required
                                validation='^([_a-zA-Z0-9-]{8,20})$'
                                name='newPassword'
                                type='password'
                                borderColor={borderColor}
                                value={userPasword.newPassword}
                                onChange={(name, value) => setPasword({ ...userPasword, [name]: value })}
                                className='form-input'
                            />
                        </div>
                        <div className="form-group">
                            <label>{t('Confirm Password')}<span>*</span></label>

                            <Input
                                required
                                validation='^([_a-zA-Z0-9-]{8,20})$'
                                name='confirmPassword'
                                type='password'
                                borderColor={borderColor}
                                value={userPasword.confirmPassword}
                                onChange={(name, value) => setPasword({ ...userPasword, [name]: value })}
                                className='form-input'
                            />
                        </div>
                    </div>
                    <div className='popup-footer'>

                        <div className='form-submit'>
                            <Button className = 'cancel-btn' onClick={close}>{t('Cancel')}</Button>
                            <Button className = 'save-btn' onClick={saveNewPassword}>{t('Save')}</Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
ChangePassword.propTypes = {
    close: PropTypes.func.isRequired,
}
export default ChangePassword;