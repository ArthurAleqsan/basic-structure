import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, withRouter, } from 'react-router-dom';



const NavigationComponent = ({ pages, selectedItem, handleSelect }) => {
    const [t] = useTranslation();
    const selectedNav = selectedItem ? selectedItem : 'home';
    return (
        <nav>
            <ul className='nav-list'>
                {pages.map((pageName, index) => {
                    let path = pageName === pages[0] ? '' : pageName.toLowerCase();
                    return (
                        <Link to = {`/${path}`} key={index}>
                            <li
                                onClick={() => handleSelect(pageName)}
                                className={`nav-list-item`}
                            >
                                {t(pageName[0].toUpperCase()+ pageName.substr(1))}
                            </li>
                            <div className = {`${selectedNav === pageName ? 'selected-page' : ''}`}></div>
                        </Link>
                    )
                })}
            </ul>
        </nav>
    )
}
NavigationComponent.propTypes = {
    pages: PropTypes.array.isRequired,
    selectedItem: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
};
export default withRouter(NavigationComponent);