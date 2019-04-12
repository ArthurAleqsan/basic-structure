import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Link } from 'react-router-dom';
import SignOutPopup from './signOutPopup';


const SettingsPopup = props => {
    const { close, setSignOutPopup } = props;
    const [t] = useTranslation();

    const closeSignOutPopup = () => {
        setSignOutPopup({popups : null});
    }
    const signOut = () => {
        setSignOutPopup({ signOutPopup: (<SignOutPopup close={closeSignOutPopup}/>) });
    }

    return (
        <div>
            <div className="popup settings-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
                <div className="popup-dialog">
                    <div className='popup-body'>
                        <p className='settings-btn setings' onClick={() => close()}><Link to='/settings'>{t('Settings')}</Link></p>
                        <p className='settings-btn signOut' onClick={() => signOut()}>{t('Sign Out')}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

SettingsPopup.propTypes = {
    close: PropTypes.func.isRequired,
    setSignOutPopup: PropTypes.func.isRequired,
}

export default SettingsPopup;