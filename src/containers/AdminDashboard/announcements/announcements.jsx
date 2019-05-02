import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { removeAnnouncement, editAnnouncement, getAnnouncments } from './../../../store/admin/admin.actions';
import Announcement from './announcement';
import Loader from './../../../components/componentsLib/Loader';


const Announcements = props => {
    const { getAnnouncments, selectedCategory, announcements, removePost, editPost } = props;
    useEffect(() => {
        getAnnouncments(selectedCategory);
    }, []);

    const actions = {
        removePost,
        editPost,
    };
    return (
        <div className='announcements-page-container'>
            {announcements.length > 0 ? announcements.map(announcement => (
                <Announcement key = {announcement.announcementId} announcement = {announcement} actions = {actions} />
            )) : <Loader />}
        </div>
    )
}
Announcements.propTypes = {
    getAnnouncments: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    announcements: PropTypes.array.isRequired,
    removePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    return {
        announcements: state.admin.announcements || [],
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removePost: (announcementId, categoryId) => dispatch(removeAnnouncement(announcementId, categoryId)),
        editPost: (announcementData, announcementId, categoryId) => dispatch(editAnnouncement(announcementData, announcementId, categoryId)),
        getAnnouncments: (categoryId,) => dispatch(getAnnouncments(categoryId)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Announcements);