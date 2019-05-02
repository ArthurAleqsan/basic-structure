import React from 'react';
import PropTypes from 'prop-types';
import CreateQuestion from './../adminPages/createQuestion';

const AnnouncementPopup = props => {
    const { close, closeEditPopup, announcement, editPost,} = props;

    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog basicPopup">
            
                <CreateQuestion
                    isEditAnnouncement={true}
                    selectedCategory={announcement.categoryId}
                    editableAnnouncement = {announcement}
                    editPost = {editPost}
                    close ={close} 
                    closeEditPopup = {closeEditPopup} 
                />
            </div>
        </div>
    )
}
AnnouncementPopup.propTypes = {
    close: PropTypes.func.isRequired,
    closeEditPopup: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    announcement: PropTypes.object.isRequired,
};
export default AnnouncementPopup;