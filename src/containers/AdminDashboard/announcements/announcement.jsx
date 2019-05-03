import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import FormatedTime from './../../../components/formatedTime/FormatedTime';
import EditPost from './../../../components/popups/editPost';
import MediaPost from './../../../components/posts/typeOfPosts/mediaPost';

const Announcement = props => {
    const { announcement, actions, type } = props;
    const [t] = useTranslation();
    const [editPostPopup, setPopup] = useState(null);
    // console.log(type)
    let _announcement = null;

    {
        switch (type) {
            case 'text':
                _announcement = <div className='answer-container-text'>
                    {announcement.text}
                </div>
                break;
                case 'media':
                _announcement = <div className='answer-container-text'>
                {/* {announcement.text} */}
                {<MediaPost post = {announcement} />}
            </div> 
        }
    }
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
                {_announcement}
            </div>
        </div>
    )
}
Announcement.propTypes = {
    announcement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};
export default Announcement;