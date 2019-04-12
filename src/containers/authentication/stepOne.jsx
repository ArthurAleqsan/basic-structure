import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next/hooks';
import { ImageBox } from './../../components/componentsLib/ImageBox';
import SubCategoryPopup from './../../components/popups/subCategoryPopup';
import {
    GetUserCategories,
    GetUserCategoriesStats,
    SetUserCategory,
    SetUserSubCategory
} from './../../store/signUp/signUp.actions';


const StepOne = props => {
    const { SetUserCategory, SetUserSubCategory, categories, GetUserCategories, categoryId, subCategoryObj } = props;
    const [t] = useTranslation();
    useEffect(() => {
        GetUserCategories();
    }, []);
    const [usersCount, setCount] = useState([]);
    useEffect(() => {
        GetUserCategoriesStats().then(usersCount => setCount(usersCount))
    }, []);
    const [state, setState] = useState({ popup: null });

    function closePopUp() {
        setState({ ...state, popup: null })
    }
    const countOfUsers = id => {
        const users = usersCount.find(obj => obj.categoryId === id);
        return users ? users.count : 0;
    };

    return (
        <div className='container-body'>
            <div className='container-header'>
                <h1>{t('Sign Up')}</h1>
                <h2>{t('Select Your Category')}</h2>
            </div>

            <div className='container-body first-step'>
                {
                    categories.map(category => {
                        return (<ImageBox
                            className='select-category-image-box'
                            key={category.id}
                            onClick={() => {
                                setState({
                                    ...state,
                                    popup: (<SubCategoryPopup
                                        subCategories={category.subcategories}
                                        close={closePopUp}
                                        setSubCategory={SetUserSubCategory}
                                        color={category.color}
                                    />)
                                });
                                SetUserCategory(category.id, true);
                            }}
                            borderColor={category.color}
                            name={category.name}
                            users={`${countOfUsers(category.id)} users`}
                            subCategoryName={category.id === categoryId && subCategoryObj ? subCategoryObj.name : null}
                            image={category.url}
                            borderSize={'7px'}
                        />)

                    })
                }

            </div>
            {state.popup}
        </div>

    );
};
StepOne.propTypes = {
    GetUserCategories: PropTypes.func.isRequired,
    SetUserCategory: PropTypes.func.isRequired,
    SetUserSubCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    categoryId: PropTypes.string,
    subcategoryId: PropTypes.string,
    subCategoryObj: PropTypes.any,
};

const mapStateToProps = (state) => {
    const { categoryId, categories, subCategoryObj } = state.signUp;
    return {
        categories,
        categoryId,
        subCategoryObj
    }
};
const mapDispatchToProps = {
    GetUserCategories,
    SetUserSubCategory,
    SetUserCategory,
};


export default connect(mapStateToProps, mapDispatchToProps)(StepOne); 