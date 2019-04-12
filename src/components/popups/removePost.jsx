import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';

const RemovePost = props => {
    const { close, postId, removePost, fromnewsfeed, currentUserId, isCommentHeader, commentedPostId , isPostImage} = props;
    const [t] = useTranslation();
    const handleSubmit = () => {
        const fromPage = fromnewsfeed ? 'newsFeed' : 'userPosts'
        isCommentHeader ? removePost(commentedPostId, postId, 'mediaPopup', isPostImage) : removePost(postId, fromPage, currentUserId);
        close();
    };
    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog sign-out-popup">
                <div className='popup-header'>
                    <p>{t('Remove post')}</p>
                </div>
                <div className='popup-body'>
                    <p>{t('Are you sure you want to remove post?')}</p>
                </div>
                <div className='popup-footer'>
                    <div className='action-button-container'>
                        <Button className='cancel-btn' onClick={handleSubmit}>{t('Yes')}</Button>
                        <Button className='save-btn' onClick={close}>{t('No')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
RemovePost.propTypes = {
    close: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    commentedPostId: PropTypes.string,
    isPostImage : PropTypes.bool,
    isCommentHeader : PropTypes.bool,
    fromnewsfeed: PropTypes.any,
    currentUserId: PropTypes.any,
};
export default RemovePost;