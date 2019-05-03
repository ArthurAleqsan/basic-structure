import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next/hooks';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './../../../../assets/styles/datepicker.scss'


import { Button } from './../../../components/componentsLib/simpleUiComponents';
import { createSingleAnnouncement } from './../../../store/admin/admin.actions';
import DropZone from './../../../components/fileUpload/DropZone';

const CreateQuestion = props => {
    const { categories, selectedCategory, createSingleAnnouncement, isEditAnnouncement, editableAnnouncement, editPost, close, closeEditPopup } = props;
    const [t] = useTranslation();

    const [announcement, setNewAnnouncement] = useState({
        text: isEditAnnouncement ? editableAnnouncement.text : '',
        activeDateFrom: isEditAnnouncement ? editableAnnouncement.activeDateFrom : '',
        activeDateTo: isEditAnnouncement ? editableAnnouncement.activeDateTo : '',
        categoryId: isEditAnnouncement ? editableAnnouncement.categoryId : '',
        mediaArray: [],
    });

    useEffect(() => {
        setNewAnnouncement({ ...announcement, categoryId: selectedCategory });
    }, []);

    const selectCategory = (categoryId) => {
        setNewAnnouncement({ ...announcement, categoryId });
    };

    // const [pending, setPending] = useState(false);

    const addMedia = useCallback((url, pending) => {
        if (url) setNewAnnouncement({ ...announcement, mediaArray: [...announcement.mediaArray, { url }] });
        // setPending(pending);
    }, [announcement]);

    const removeMedia = useCallback((url, pending) => {
        const newMediaArray = announcement.mediaArray.filter((item) => item.url !== url);
        setNewAnnouncement({ ...announcement, mediaArray: newMediaArray });
        // setPending(pending);
    }, [announcement]);



    const createAnnouncement = () => {
        event.preventDefault();
        if (isEditAnnouncement) {
            editPost(announcement, editableAnnouncement.announcementId, announcement.categoryId);
            close();
            closeEditPopup();
        } else {
            createSingleAnnouncement(announcement);
            Object.keys(announcement).forEach( k => {
                announcement[k] = ''
            });
            // message.success('Creation of announcement is successfully finished.')
            setNewAnnouncement({ ...announcement, categoryId: selectedCategory,  mediaArray : [] });
            // setNewAnnouncement({...announcement, mediaArray : []});
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
                        autoComplete='off'
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
                        autoComplete='off'
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
                            <div className='create-post-buttons-container'>

                                <DropZone className='drop-zone'
                                    handleComplete={(d, pending) => addMedia(d, pending)}
                                    remove={(url, pending) => removeMedia(url, pending)}
                                    multiple={true}
                                    // defaultUploads={url ? [url] : []}
                                    hidePreview={false}
                                >
                                    <div className={`add-media-post `}>
                                        <i className='add-media' />
                                        {<span>{t('Photo/Video')}</span>}
                                    </div>
                                </DropZone>
                                {/* <div className='add-media-post smile-container'>
                                    <Emoji handleSelect={addEmoji} fromTextArea={true} />
                                </div> */}
                            </div>
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
        categories: state.signUp.categories,
    }
};

const mapDispatchToProps = () => {
    return {
        createSingleAnnouncement: (data) => createSingleAnnouncement(data),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
