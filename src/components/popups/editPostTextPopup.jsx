import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';

const EditPostTextPopup = props => {
    const { text, editPost, postId, close, isCommentHeader } = props;
    const [t] = useTranslation();
    const [postText, setnewPostText] = useState(text);
    const newPost = () => {
        isCommentHeader ? editPost(postId, commentId, postText, true) : editPost(postId, { text: postText });
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
                                value={postText}
                                onChange={(e) => setnewPostText(e.target.value)}
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

                        <Button type='button' className='create-post-btn' onClick={() => newPost()}> Save </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
EditPostTextPopup.propTypes = {
    text: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    editPost: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};
export default EditPostTextPopup