import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import EditPostTextPopup from './editPostTextPopup';
import RemovePost from './removePost';

const EditPost = props => {
    const { close, actions, post, fromnewsfeed, currentUserId, isCommentHeader, commentedPostId, isPostImage } = props;
    console.log(post);
    console.log(commentedPostId);
    // const { editPost, removePost } = actions ;
    let editPost;
    let removePost;
    if (isCommentHeader) {
        editPost = actions.editComment;
        removePost = actions.removeComment;
    } else {
        editPost = actions.editPost;
        removePost = actions.removePost;
    }
    const [t] = useTranslation();
    const [editedPostData, editPostData] = useState({
        text: post.text,
        permission: post.permission
    });
    const [popupCollections, setPopup] = useState({
        edit: null,
        delete: null,
    });
    const editPermission = (permission) => {
        editPostData(({ ...editedPostData, permission, }));
        editPost(post.postId, editedPostData);
        close();
    }

    return (
        <div className="edit-post-popup" onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className='edit-post-container'>
                <div className='edit-post-container-header'>
                    <p
                        onClick={
                            () => setPopup({
                                ...popupCollections,
                                edit: <EditPostTextPopup
                                    close={() => setPopup({ ...popupCollections, edit: null })}
                                    text={isCommentHeader ? post.commentText : post.text}
                                    postId={isCommentHeader ? post.commentId : post.postId}
                                    editPost={editPost}
                                    isCommentHeader={isCommentHeader}
                                />
                            })
                        }
                    >
                        {t('Edit')}
                    </p>
                    <p
                        onClick={
                            () => setPopup({
                                ...popupCollections,
                                delete: <RemovePost
                                    close={() => setPopup({ ...popupCollections, delete: null })}
                                    currentUserId={currentUserId}
                                    postId={isCommentHeader ? post.commentId : post.postId}
                                    removePost={removePost}
                                    fromnewsfeed={fromnewsfeed}
                                    isCommentHeader={isCommentHeader}
                                    commentedPostId={commentedPostId}
                                    isPostImage ={isPostImage}
                                />
                            })
                        }>
                        {t('Delete')}
                    </p>
                </div>
                {!isCommentHeader && (
                    <div className='edit-post-container-body'>
                        <p className={`${post.permission === 'public' ? 'selected-permission' : ''}`} onClick={() => editPermission('public')}>{t('Public')}</p>
                        <p className={`${post.permission === 'friends' ? 'selected-permission' : ''}`} onClick={() => editPermission('friends')}>{t('Friends')}</p>
                        <p className={`${post.permission === 'private' ? 'selected-permission' : ''}`} onClick={() => editPermission('private')}>{t('Private')}</p>
                    </div>
                )}
            </div>
            <div id='popup' className='edit-post-background'></div>
            {popupCollections.edit}
            {popupCollections.delete}
        </div>
    )
}
EditPost.propTypes = {
    close: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    fromnewsfeed: PropTypes.any,
    currentUserId: PropTypes.string.isRequired,
    isCommentHeader: PropTypes.any,
};
export default EditPost;