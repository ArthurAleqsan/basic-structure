import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './../../../assets/styles/datepicker.scss';

const EditPostTextPopup = props => {
    const { editPost, close, announcement } = props;
    const { text, activeDateFrom, activeDateTo } = announcement;
    const [t] = useTranslation();
    const [oldannouncement, setNewAnnouncement] = useState({
        text,
        activeDateFrom,
        activeDateTo,

    });
    console.log(announcement)
    const newPost = () => {
        // isCommentHeader ? editPost(postId, commentId, postText, true) : editPost(postId, { text: postText });
        close();
    };
    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog create-new-post">
                <form className='new-post-form' >
                    <div className='create-new-post-body'>
                        <div className='create-new-post-container'>
                            <textarea
                                className='create-new-post-input'
                                name='newPostText'
                                value={oldannouncement.text}
                                onChange={(e) => setNewAnnouncement({...oldannouncement, text: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className='create-new-post-footer'>
                        <div className='create-post-buttons-container'>
                            <div className='add-media-post smile-container'>
                                <i className='message-popup-smile'></i>
                                <span>{t('Emojies')}</span>
                            </div>
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


                        <Button type='button' className='create-post-btn' onClick={() => newPost()}> Save </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
EditPostTextPopup.propTypes = {
    announcement: PropTypes.object.isRequired,
    editPost: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};
export default EditPostTextPopup