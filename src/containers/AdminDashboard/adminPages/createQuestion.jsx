import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next/hooks';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './../../../../assets/styles/datepicker.scss'

// import DropZone from './../../../components/fileUpload/DropZone'; 
import { Button } from './../../../components/componentsLib/simpleUiComponents';
import { createSingleAnnouncement } from './../../../store/admin/admin.actions';
import { getSubCategoriesForUserSettings } from '../../../store/user/user.actions';

const CreateQuestion = props => {
    const { categories, selectedCategory, getSubCategories, subCategories, createSingleAnnouncement, isEditAnnouncement, editableAnnouncement, editPost, close } = props;
    const [t] = useTranslation();
    // const propsSubCategories = [];

    const [announcement, setNewAnnouncement] = useState({
        text: isEditAnnouncement ? editableAnnouncement.text : '',
        activeDateFrom: isEditAnnouncement ? editableAnnouncement.activeDateFrom : '',
        activeDateTo: isEditAnnouncement ? editableAnnouncement.activeDateTo : '',
        categoryId: isEditAnnouncement ? editableAnnouncement.categoryId : '',
        subCategoryIds: [],
    });
    const [selectedSubCategories, setselectedSubCategories] = useState([]);

    // if(isEditAnnouncement) {
    //     subCategories.map(subCategory => {
    //         const selectedSubCategory = editableAnnouncement.subCategoryIds.map(subCategoryId => {
    //             // console.log(subCategoryId)
    //             // console.log(subCategory.id)
    //             if(subCategory.id === subCategoryId) {
    //                 let i = 0
    //                 console.log(i++)
    //                 // setselectedSubCategories([...propsSubCategories, subCategory])
    //             }
    //         });
    //         // console.log(selectedSubCategory)
    //         // setselectedSubCategories([...propsSubCategories, subCategories);
    //     });

    // }
    // console.log(selectedSubCategories)

    useEffect(() => {
        getSubCategories(selectedCategory);
        setNewAnnouncement({ ...announcement, categoryId: selectedCategory });
    }, []);
    // const [pending, setPending] = useState(false);

    // const addMedia = useCallback((url, pending) => {
    //     if (url) setNewAnnouncement({ ...announcement, mediaArray: [...postData.mediaArray, { url }] });
    //     setPending(pending);
    // }, [announcement]);

    const selectCategory = (categoryId) => {
        setselectedSubCategories([]);
        getSubCategories(categoryId);
        setNewAnnouncement({ ...announcement, categoryId });
    };
    const selectSubCategory = (subCategory) => {
        const selectedSubCategory = JSON.parse(subCategory);
        setselectedSubCategories([...selectedSubCategories, selectedSubCategory]);
    };

    const removeFromSelectedCategories = (subCategoryId) => {
        const index = selectedSubCategories.findIndex(subCategory => subCategoryId === subCategory.id);
        const newselectedSubCategories = [...selectedSubCategories];
        newselectedSubCategories.splice(index, 1);
        setselectedSubCategories(newselectedSubCategories);
    };

    const createAnnouncement = () => {
        event.preventDefault();
        const subCategoryIds = selectedSubCategories.map(selectedSubCategory => announcement.subCategoryIds.push(selectedSubCategory.id));
        setNewAnnouncement({ ...announcement, subCategoryIds, });
        isEditAnnouncement ? editPost(announcement, editableAnnouncement.announcementId, announcement.categoryId) : createSingleAnnouncement(announcement);
        isEditAnnouncement && close();
    }

    return (
        <div className='admin-create-question'>
            <div className='select-category-selectBox'>
                <p>{t('Categories')}<span> *</span></p>
                <select className='form-input selectBox' defaultValue={selectedCategory} onChange={() => selectCategory(event.target.value)}>
                    {categories.map(catergory => {
                        return <option key={catergory.id} value={catergory.id} >{catergory.name}</option>
                    })}
                </select>

            </div>
            {selectedSubCategories.length > 0 && (
                <div className='show-selected-subcategories'>
                    {selectedSubCategories.map(subcategory => (
                        <div className='show-selected-subcategory' key={subcategory.id}>
                            <div>{subcategory.name}</div>
                            <small onClick={() => removeFromSelectedCategories(subcategory.id)}>x</small>
                        </div>
                    )
                    )
                    }
                </div>
            )}
            <div className='select-category-selectBox'>
                <p>{t('Subcategories')}<span></span></p>
                <select className='form-input selectBox changeCategory' onChange={() => selectSubCategory(event.target.value)} defaultValue={subCategories[0] && subCategories[0].id}>
                    {subCategories && subCategories.map(subCatergory => {
                        return <option key={subCatergory.id} value={JSON.stringify(subCatergory)}>{subCatergory.name}</option>
                    })}
                </select>
            </div>

            <div className='select-category-selectBox select-category-selectBox-datepicker'>
                <div className="form-group datePicker-container">
                    <label>{t(`Announcement active From `)} <span> *</span></label>

                    <DatePicker
                        name='activeFrom'
                        className='form-input'
                        placeholderText='DD/MM/YY'
                        selected={announcement.activeDateFrom && new Date(announcement.activeDateFrom)}
                        onChange={(date) => setNewAnnouncement({ ...announcement, activeDateFrom: new Date(date).toISOString() })}
                        dateFormat='dd/MM/yy'
                    />

                </div>
                <div className="form-group datePicker-container">
                    <label>{t(`Announcement active To `)} <span> *</span></label>

                    <DatePicker
                        name='activeTo'
                        className='form-input'
                        placeholderText='DD/MM/YY'
                        selected={announcement.activeDateTo && new Date(announcement.activeDateTo)}
                        onChange={(date) => setNewAnnouncement({ ...announcement, activeDateTo: new Date(date).toISOString() })}
                        dateFormat='dd/MM/yy'
                    />

                </div>
            </div>

            <div className='select-category-selectBox'>
            <p>{t('Message')}<span> *</span></p>
                <form className='new-post-form' onSubmit={e => e.preventDefault()}>
                    <div className='create-new-post-body'>
                        <div className='create-new-post-container'>
                            <textarea
                                className='create-new-post-input'
                                placeholder={t('Your Post Here')}
                                name='text'
                                value={announcement.text}
                                onChange={(e) => setNewAnnouncement({ ...announcement, text: e.target.value })}
                            />
                        </div>
                        {/* <div className='action-button-container'> */}
                        {/* <Button className='cancel-btn' onClick={close}>Cancel</Button> */}
                        <Button className='create-post-btn' onClick={() => createAnnouncement()}>Send</Button>
                        {/* </div> */}
                    </div>

                </form>
            </div>

        </div>
    )
}
CreateQuestion.propTypes = {
    categories: PropTypes.array.isRequired,
    subCategories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    getSubCategories: PropTypes.func.isRequired,
    createSingleAnnouncement: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    return {
        subCategories: state.user.subCategories,
        categories : state.signUp.categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createSingleAnnouncement: (data) => createSingleAnnouncement(data),
        getSubCategories: (categoryId) => dispatch(getSubCategoriesForUserSettings(categoryId)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
