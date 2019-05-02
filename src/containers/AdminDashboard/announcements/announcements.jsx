import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { removeAnnouncement, editAnnouncement, getAnnouncments } from './../../../store/admin/admin.actions';
import Announcement from './announcement';
import Loader from './../../../components/componentsLib/Loader';
import { useTranslation } from 'react-i18next/hooks';


const Announcements = props => {
    const { getAnnouncments, selectedCategory, announcements, removePost, editPost, categories } = props;
    const [t] = useTranslation();
    useEffect(() => {
        getAnnouncments(selectedCategory);
    }, []);

    const selectCategory = (categoryId) => {
        getAnnouncments(categoryId);
    };

    const actions = {
        removePost,
        editPost,
    };
    return (
        <div className='announcements-page-container'>
            <div className='select-category-selectBox'>
                <p>{t('Categories')}<span> *</span></p>
                <select className='form-input selectBox' defaultValue={selectedCategory} onChange={() => selectCategory(event.target.value)}>
                    {categories.map(catergory => {
                        return <option key={catergory.id} value={catergory.id} >{catergory.name}</option>
                    })}
                </select>

            </div>
            {announcements ? announcements.map(announcement => (
                <Announcement key={announcement.announcementId} announcement={announcement} actions={actions} />
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
    categories: PropTypes.array.isRequired,
};
const mapStateToProps = state => {
    return {
        announcements: state.admin.announcements,
        categories : state.signUp.categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        removePost: (announcementId, categoryId) => dispatch(removeAnnouncement(announcementId, categoryId)),
        editPost: (announcementData, announcementId, categoryId) => dispatch(editAnnouncement(announcementData, announcementId, categoryId)),
        getAnnouncments: (categoryId, ) => dispatch(getAnnouncments(categoryId)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Announcements);