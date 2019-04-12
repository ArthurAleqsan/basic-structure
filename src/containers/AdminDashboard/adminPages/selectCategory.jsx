import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';

const SelectCategory = props => {
    const { getUserCategories, categories, title, isRequired, setCategory } = props;
    const [t] = useTranslation();
    useEffect(() => {
        getUserCategories();
    }, []);
    
    return (
        <div className='select-categories-container'>
            <div className={`select-categories-container-header ${!isRequired && 'big-title'}`}>
                {t(title)}<span>{isRequired && '*'}</span>
            </div>
            <div className='select-categories-container-body'>
                {isRequired && (<div className= 'dashboard-category  dashboard-category-title'>{t('Select category')}</div>)}
                {categories.map(category => {
                    return (<div key={category.name} className='dashboard-category' style={{ backgroundColor: category.color }} onClick = {() => setCategory(category.id)} >
                        <p>{t('Category ') + category.name}</p>
                        {/* <p>500 {t('Users')}</p> */}
                    </div>)
                })}
            </div>
        </div>
    )
}
SelectCategory.propTypes = {
    getUserCategories: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
};

export default SelectCategory;