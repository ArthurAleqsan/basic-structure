import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import FormatedTime from './../../../components/formatedTime/FormatedTime';
import EditPost from './../../../components/popups/editPost';

const Announcement = props => {
    const { announcement, actions, } = props;
    const [t] = useTranslation();
    const [editPostPopup, setPopup] = useState(null);
    return (
        <div className='answer-container'>
            <div className='answer-container-header'>
                <div className='header-columns'>
                    <div className='announcement-date-container'>{t(`Announcement active from`)} <FormatedTime value={announcement.activeDateFrom} /> </div>
                    <div className='announcement-date-container'>{t(`Announcement active to`)} <FormatedTime value={announcement.activeDateTo} /> </div>
                </div>
                <div className='header-columns'>
                    <div className='post-header-editPost-column'>
                        <div className='edit-dots'>
                            <img
                                src='/assets/images/icons/menu.svg'
                                onClick={() => setPopup(<EditPost
                                    close={() => setPopup(null)}
                                    actions={actions}
                                    post={announcement}
                                />)
                                }
                            />
                            {editPostPopup}
                        </div>
                    </div>
                </div>

            </div>
            <div className='answer-container-body'>
                <div className='answer-container-text'>{announcement.text}</div>
            </div>
        </div>
    )
}
Announcement.propTypes = {
    announcement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};
export default Announcement;