import React from 'react';
import PropTypes from 'prop-types';
import CreateQuestion from './../adminPages/createQuestion';

const AnnouncementPopup = props => {
    const { close, announcement, editPost, announcements } = props;

    // console.log(announcement,);
    // console.log('ts',announcements,);

    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog basicPopup">
            
                <CreateQuestion
                    isEditAnnouncement={true}
                    selectedCategory={announcement.categoryId}
                    editableAnnouncement = {announcement}
                    editPost = {editPost}
                    close ={close}  
                />
            </div>
        </div>
    )
}
AnnouncementPopup.propTypes = {
    close: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    announcement: PropTypes.object.isRequired,
};
export default AnnouncementPopup;