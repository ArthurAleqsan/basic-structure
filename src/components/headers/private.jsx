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
                <Link to='/question'>
                    <div className={`dashboard-nav-tab ${activeTab === 'question' ? 'active-tab' : ''}`} onClick={() => toogleTab('question')}>{t('Question')}</div>
                </Link>
                <Link to='/answers'>
                    <div className={`dashboard-nav-tab ${activeTab === 'answers' ? 'active-tab' : ''}`} onClick={() => toogleTab('answers')}>{t('Announcements')}</div>
                </Link>
            </div>
            <p onClick = {() => props.logout()}>Log Out</p>
        </div>
    )
};
HeaderPrivate.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(HeaderPrivate);