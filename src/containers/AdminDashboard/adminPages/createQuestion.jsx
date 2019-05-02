import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next/hooks';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './../../../../assets/styles/datepicker.scss'

import { Button } from './../../../components/componentsLib/simpleUiComponents';
import { createSingleAnnouncement } from './../../../store/admin/admin.actions';

const CreateQuestion = props => {
    const { categories, selectedCategory, createSingleAnnouncement, isEditAnnouncement, editableAnnouncement, editPost, close, closeEditPopup } = props;
    const [t] = useTranslation();

    const [announcement, setNewAnnouncement] = useState({
        text: isEditAnnouncement ? editableAnnouncement.text : '',
        activeDateFrom: isEditAnnouncement ? editableAnnouncement.activeDateFrom : '',
        activeDateTo: isEditAnnouncement ? editableAnnouncement.activeDateTo : '',
        categoryId: isEditAnnouncement ? editableAnnouncement.categoryId : '',
    });

    useEffect(() => {
        setNewAnnouncement({ ...announcement, categoryId: selectedCategory });
    }, []);

    const selectCategory = (categoryId) => {
        setNewAnnouncement({ ...announcement, categoryId });
    };



    const createAnnouncement = () => {
        event.preventDefault();
        if(isEditAnnouncement) {
            editPost(announcement, editableAnnouncement.announcementId, announcement.categoryId);
            close();
            closeEditPopup();
        } else {
            createSingleAnnouncement(announcement);
        }
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

                        <Button className='create-post-btn' onClick={() => createAnnouncement()}>Send</Button>
                    </div>

                </form>
            </div>

        </div>
    )
}
CreateQuestion.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    createSingleAnnouncement: PropTypes.func.isRequired,
    editPost: PropTypes.func,
    close: PropTypes.func,
    closeEditPopup: PropTypes.func,
    isEditAnnouncement: PropTypes.bool,
    editableAnnouncement: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        categories : state.signUp.categories,
    }
};

const mapDispatchToProps = () => {
    return {
        createSingleAnnouncement: (data) => createSingleAnnouncement(data),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
