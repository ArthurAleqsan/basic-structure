import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next/hooks';


const HeaderPrivate = props => {
    const pathName = (props.location.pathname).split('/')[1];

    const [t] = useTranslation();

    const [activeTab, toogleTab] = useState(pathName);

    return (
        <div className="container">
            <div className='dashboard-header'>
                <Link to='/create_a_announcement'>
                    <div className={`dashboard-nav-tab ${activeTab === 'create_a_announcement' ? 'active-tab' : ''}`} onClick={() => toogleTab('create_a_announcement')}>{t('Create a announcement')}</div>
                </Link>
                <Link to='/announcements'>
                    <div className={`dashboard-nav-tab ${activeTab === 'announcements' ? 'active-tab' : ''}`} onClick={() => toogleTab('announcements')}>{t('Announcements')}</div>
                </Link>
            </div>
            <p onClick = {() => props.logout()}>Log Out</p>
        </div>
    )
};
HeaderPrivate.propTypes = {
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default withRouter(HeaderPrivate);