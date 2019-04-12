import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/hooks';
import PostPopup from './../popups/postPopup';


const CreatePost = () => {
    const [t] = useTranslation();
    const [newPostPopup, setPopup] = useState(null);
    const closePopUp = () => {
        setPopup(null);
    };
    return (
        <div>
            <div className='create-new-post-container' onClick={() => { setPopup((<PostPopup close={closePopUp} />)) }}>
                <div className='create-new-post-input'>
                    <span>{t('Your Post Here')}</span>
                    <div className='create-new-post-footer'>
                        <div className='add-media-post'>
                            <i className='add-media'/>
                            <span>{t('Photo/Video')}</span>
                        </div>
                        <div className='add-media-post smile-container'>
                            <i className='message-popup-smile'></i>
                            <span>{t('Emojies')}</span>
                        </div>
                    </div>

                </div>

            </div>
            {newPostPopup}
        </div>

    )
};

export default CreatePost;