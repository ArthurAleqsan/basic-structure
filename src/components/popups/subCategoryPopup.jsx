import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { setSignUpNextStep, SetUserCustomSubCategory } from './../../store/signUp/signUp.actions';
import { changeUserSettingsFields } from './../../store/user/user.actions';
import { Input, Button } from '../componentsLib/simpleUiComponents';
import { SubCategoryContainer } from '../componentsLib/subCategory';

// eslint-disable-next-line react/display-name
const SubCategoryPopup = memo(props => {
    const { subCategories, setSubCategory, close, setSignUpNextStep, color, location,
        changeUserSettingsFields, SetUserCustomSubCategory, subcategoryCustom } = props;
    const [t] = useTranslation();

    const chooseSubCategoryHandler = (subCategory) => {
        if (location === '/settings') {
            changeUserSettingsFields('subcategoryCustom', '');
            changeUserSettingsFields('subcategory', subCategory);
            changeUserSettingsFields('subcategoryId', subCategory.id);
            close();
        } else {
            setSubCategory(subCategory);
            setSignUpNextStep(2);
            close();
        }
    };
    const setCustomSubcategory = (name, value) => {
        location === '/settings' ? changeUserSettingsFields(name, value) : SetUserCustomSubCategory({ name: value });
    }
    const createCustomSubCategory = () => {
        event.preventDefault();
        location === '/settings' ? changeUserSettingsFields('subcategoryCustom', subcategoryCustom) : setSignUpNextStep(2);
        close();
    }
    return (<div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
        <div className="popup-dialog subCatergory">
            <div className='popup-header'>
                {t('Select Your Subcategory')}
            </div>
            <div className='popup-body'>
                {subCategories.map(subCategory =>
                    <SubCategoryContainer
                        key={subCategory.name}
                        id={subCategory.name}
                        name={subCategory.name}
                        onClick={(e) => { e.target.id === "popup" ? null : chooseSubCategoryHandler(subCategory); }}
                        color={color}
                    />
                )}
            </div>
            <div className='popup-footer'>
                <form className='popup-form' onSubmit={() => createCustomSubCategory()}>
                    <Input
                        placeholder='Create your subcategory'
                        name='subcategoryCustom'
                        className='popup-input'
                        value={subcategoryCustom}
                        onChange={(name, value) => setCustomSubcategory(name, value)}
                    />
                    <Button type="submit" className='popup-btn' onClick={() => createCustomSubCategory()}>{t('Create')}</Button>
                </form>
            </div>
        </div>
    </div>);
});

SubCategoryPopup.propTypes = {
    close: PropTypes.func,
    subCategories: PropTypes.array.isRequired,
    setSubCategory: PropTypes.func,
    changeUserSettingsFields: PropTypes.func,
    SetUserCustomSubCategory: PropTypes.func,
    setSignUpNextStep: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    subcategoryCustom: PropTypes.string,
    location: PropTypes.string,
};
const mapStateToProps = state => {
    return {
        subcategoryCustom: state.user.currentUser ? state.user.currentUser.subcategoryCustom : state.signUp.subcategoryCustom,
    }
}

const mapDispatchToProps = dispatch => ({
    setSignUpNextStep: (step) => dispatch(setSignUpNextStep(step)),
    changeUserSettingsFields: (field, value) => dispatch(changeUserSettingsFields(field, value)),
    SetUserCustomSubCategory: (subCategory) => dispatch(SetUserCustomSubCategory(subCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryPopup);