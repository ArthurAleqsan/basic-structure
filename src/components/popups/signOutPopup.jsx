import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next/hooks';
import { logout } from '../../store/user/user.actions';
import { Button } from '../componentsLib/simpleUiComponents';

const SignOut = props => {
    const { close, logout } = props;
    const [t] = useTranslation();
    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog sign-out-popup">
                <div className='popup-header'>
                    <p>{t('Sign out')}</p>
                </div>
                <div className='popup-body'>
                    <p>{t('Are you sure you want to sign out?')}</p>
                </div>
                <div className='popup-footer'>
                    <div className='action-button-container'>
                        <Button className='cancel-btn' onClick={logout}>{t('Yes')}</Button>
                        <Button className='save-btn' onClick={close}>{t('No')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
SignOut.propTypes = {
    close: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        },
    }
};
export default connect(null, mapDispatchToProps)(SignOut);