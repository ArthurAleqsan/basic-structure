import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Link } from 'react-router-dom';
import { ImageBox } from './../componentsLib/ImageBox';
import { Input } from './../componentsLib/simpleUiComponents';
import { addComment, getComments, editComment, removeComment } from './../../store/comments/comments.actions';
import VideoBox from './../../components/componentsLib/videoBox';
import SharePostPopup from './sharePostPopup';
import { likePost, unLikePost } from './../../store/posts/post.actions';
import PostComments from './../posts/postsTemplates/postComments';


const ImagePopup = props => {
    const { close, imagesArr, index, isPostImage,
        type, addComment, className, user, getComments,
        likePost, unLikePost, comments, currentUserId,
        editComment, removeComment, mediaPost, media, offset, mediaType } = props;

    const { firstName, lastName, category, profilePictureUrl } = user;

    const userName = `${firstName} ${lastName}`;
    const userId = user.userId ? user.userId : user.id;

    const [t] = useTranslation();
    const [imagePopupIndex, setimagePopupState] = useState(+index || 0);
    const [comment, setComment] = useState('');
    const [sharePostPopop, setPopup] = useState(null);
    const [toggleShowingComments, toggleShowing] = useState({});

    const post = isPostImage ? imagesArr[imagePopupIndex] : media[imagePopupIndex];
    const mediaId = isPostImage ? imagesArr[imagePopupIndex].mediaId : mediaPost.mediaId;


    const next = () => {
        setimagePopupState(imagePopupIndex + 1);
    };
    const prev = () => {
        setimagePopupState(imagePopupIndex - 1);
    };
    const addCommentToMedia = (mediaId) => {
        event.preventDefault();
        addComment(mediaId, comment, 'mediaPopup', isPostImage);
        setComment('');
        toggleShowing({ mediaId, show: true });
    };

    const handleLike = () => {
        post.liked ? unLikePost(mediaId, true, mediaType, offset) : likePost(mediaId, true, mediaType, offset);
    };
    const showComments = () => {
        getComments(mediaId);
        toggleShowing({ mediaId, show: true });
    };



    const url = isPostImage ? imagesArr[imagePopupIndex].url : imagesArr[imagePopupIndex];

    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className={`popup-dialog imageSlider ${className ? className : ''}`}>

                <div className='popup-body'>
                    <div className='imageSlider-image-raw'>
                        {type === 'video' ?
                            <VideoBox
                                key={index}
                                url={url}
                            />
                            :
                            <ImageBox className='imageSlider-image' image={url} borderColor={category.color} objectFit={'contain'} borderSize={'3px'} />
                        }
                        <div className='imageSlider-arrow-container'>
                            <div className={`arrow ${imagePopupIndex === 0 ? 'visibility-hidden' : ''}`} onClick={prev}><img src='/assets/images/icons/arrow-left.svg' /></div>
                            <div className={`arrow ${imagePopupIndex === imagesArr.length - 1 ? 'visibility-hidden' : ''}`} onClick={next}><img src='/assets/images/icons/arrow-right.svg' /></div>
                        </div>
                    </div>
                    <div className='imageSlider-comment-raw'>
                        <div className='comment-raw-header'>
                            <Link to={`/${userId}`}>
                                <ImageBox className='raw-header-image' borderColor={category.color} borderSize={'3px'} image={profilePictureUrl} />
                            </Link>
                            <div className='post-header-info'>
                                <Link to={`/${userId}`}>
                                    <p className='imagePopup-header-name' style={{ color: category.color }}>{userName}</p>
                                </Link>
                                <p className='imagePopup-header-categoryName'>{t('Category ') + category.name}</p>
                            </div>
                            <div className='comment-raw-header-icons-container'>
                                <div className='post-footer-icons'>
                                    <i className={post.liked ? 'like-full' : 'like-icon'} onClick={() => handleLike()}></i>
                                    <span className='likes'>{post.likeCount > 0 ? post.likeCount : null}</span>
                                </div>
                                <div className='post-footer-icons'>
                                    <i className='comment-icon' onClick={() => showComments()}></i>
                                    <span className='comments'>{post.commentCount > 0 ? post.commentCount : null}</span>
                                </div>
                                <div className='post-footer-icons'>
                                    <i className='share-icon' onClick={() => { setPopup(<SharePostPopup post={post} close={() => setPopup(null)} />) }} ></i>
                                    <span></span>
                                </div>
                            </div>

                        </div>
                        <form onSubmit={() => addCommentToMedia(mediaId)}>
                            <Input
                                placeholder='Comment'
                                className='form-input'
                                name='comment'
                                value={comment}
                                onChange={(name, value) => setComment(value)}
                            />
                        </form>
                        <div className='comments-container'>
                            {toggleShowingComments.mediaId === mediaId && comments[mediaId]
                                && (<PostComments
                                    commentedPostId={mediaId}
                                    currentUserId={currentUserId}
                                    comments={comments[mediaId]}
                                    actions={{ editComment, removeComment }}
                                    countOfComments={post.commentCount}
                                    isPostImage={isPostImage}
                                />)
                            }
                        </div>
                    </div>
                </div>
            </div>
            {sharePostPopop}
        </div>
    )
};
ImagePopup.propTypes = {
    close: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unLikePost: PropTypes.func.isRequired,
    imagesArr: PropTypes.array.isRequired,
    index: PropTypes.any,
    className: PropTypes.string,
    comments: PropTypes.object,
    media: PropTypes.array,
    mediaPost: PropTypes.object,
    isPostImage: PropTypes.bool,
    type: PropTypes.string,
    user: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired,
};
const mapStateToProps = state => {
    const { media, offset } = state.media;
    return {
        comments: state.comments || [],
        currentUserId: state.user.currentUser.id,
        media,
        offset,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addComment: (id, comment, mediaPopup, isPostImage) => dispatch(addComment(id, comment, mediaPopup, isPostImage)),
        getComments: (mediaId) => dispatch(getComments(mediaId)),
        likePost: (mediaId, isMedia, mediaType, offset) => dispatch(likePost(mediaId, isMedia, mediaType, offset)),
        unLikePost: (mediaId, isMedia, mediaType, offset) => dispatch(unLikePost(mediaId, isMedia, mediaType, offset)),
        editComment: (postId, commentId, commentText, isPostComment) => dispatch(editComment(postId, commentId, commentText, isPostComment)),
        removeComment: (postId, commentId, fromPage, isPostImage) => dispatch(removeComment(postId, commentId, fromPage, isPostImage)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ImagePopup);