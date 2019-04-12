import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';

const BasicPopup = props => {
    const { close, sendEmail } = props;
    const [t] = useTranslation();

    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog basicPopup">
                <div className='popup-body'>
                    <p className = 'popup-body-message'>{t('We send verification link to your email.')}</p>
                    <p className = 'popup-body-link-message'>{t('Please open the email and click on the link')}</p>
                </div>
                <div className='popup-footer'>
                    <p className = 'resend-email' onClick = {sendEmail}>{t('Resend email')}</p>
                </div>
            </div>
        </div>
    )
}
BasicPopup.propTypes = {
    close: PropTypes.func.isRequired,
    sendEmail : PropTypes.func,
}
export default BasicPopup;

