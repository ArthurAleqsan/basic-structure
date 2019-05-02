import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';

import { GetUserCategories } from './../../../store/signUp/signUp.actions';
import Loader from './../../../components/componentsLib/Loader';

const SelectCategory = props => {
    const { getUserCategories, categories, title, isRequired, setCategory, } = props;
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
                {categories.length > 1 ? categories.map(category => {
                    return (<div key={category.name} className='dashboard-category' style={{ backgroundColor: category.color }} onClick = {() => setCategory(category.id)} >
                        <p>{category.name}</p>
                    </div>)
                }) : <Loader />}
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
const mapStateToProps = state => {
    const { categories } = state.signUp;
    return {
        categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserCategories: () => dispatch(GetUserCategories()),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SelectCategory);