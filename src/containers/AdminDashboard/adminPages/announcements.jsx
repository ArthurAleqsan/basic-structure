import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Announcements = props => {
    const { getAnnouncments, selectedCategory, announcements } = props;
    useEffect(() => {
        getAnnouncments(selectedCategory);
    }, []);
    console.log(announcements);
    return (
        <div className='announcements-page-container'>
            {announcements.length > 0 && announcements.map(announcement => (
                <div key={announcement.announcementId}>{announcement.text}</div>
            ))}
        </div>
    )
}
Announcements.propTypes = {
    getAnnouncments: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    announcements: PropTypes.array.isRequired,
};
const mapStateToProps = state => {
    return {
        announcements: state.admin.announcements || [],
    }
};
export default connect(mapStateToProps)(Announcements);