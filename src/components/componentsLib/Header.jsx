import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import NavigationComponent from './simpleUIComponents/NavigationComponent';
import { withRouter } from 'react-router';


const Header = () => {
    const [t] = useTranslation();
    const pageURL = window.location.href.split('/');
    const [selectedItem, setSelectedItem] = useState(pageURL[pageURL.length - 1]);

    const handleSelect = (page) => {
        setSelectedItem(page);
    };

    return (
        <header className='main-header'>
            <div className='logo-container'></div>
            <NavigationComponent
                pages={['home', 'industries', 'services', 'careers']}
                selectedItem={selectedItem}
                handleSelect={(pageName) => handleSelect(pageName)}
            />
            <div><span className='contact-item'>{t('CONTACT')}</span></div>
        </header>
    )
}

export default withRouter(Header);