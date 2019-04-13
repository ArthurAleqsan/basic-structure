import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import RemovePost from './removePost';
import AnnouncementPopup from '../../containers/AdminDashboard/announcements/announcementPopup';

const EditPost = props => {
    const { close, actions, post, } = props;
    const { removePost, editPost } = actions;

    const [t] = useTranslation();

    const [popupCollections, setPopup] = useState({
        edit: null,
        delete: null,
    });

    return (
        <div className="edit-post-popup" onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className='edit-post-container'>
                <div className='edit-post-container-header'>
                    <p
                        onClick={
                            () => setPopup({
                                ...popupCollections,
                                edit: <AnnouncementPopup
                                    close={() => setPopup({ ...popupCollections, edit: null })}
                                    isEditAnnouncement={true}
                                    selectedCategory={post.categoryId}
                                    announcement={post}
                                    editPost={editPost}
                                />
                            })
                        }
                    >
                        {t('Edit')}
                    </p>
                    <p
                        onClick={
                            () => setPopup({
                                ...popupCollections,
                                delete: <RemovePost
                                    close={() => setPopup({ ...popupCollections, delete: null })}
                                    announcement={post}
                                    removePost={removePost}
                                />
                            })
                        }>
                        {t('Delete')}
                    </p>
                </div>
            </div>
            <div id='popup' className='edit-post-background'></div>
            {popupCollections.edit}
            {popupCollections.delete}
        </div>
    )
}
EditPost.propTypes = {
    close: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};
export default EditPost;