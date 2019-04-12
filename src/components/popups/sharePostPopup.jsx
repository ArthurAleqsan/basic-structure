import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';
import { sharePost } from '../../store/posts/post.actions';
import { ImageBox } from '../componentsLib/ImageBox';
import MediaPost from '../posts/typeOfPosts/mediaPost';
import SharedPost from '../posts/typeOfPosts/sharedPost';
import AnswerPost from '../posts/typeOfPosts/answerPost';


const SharePostPopup = props => {
    const { close, sharePost, post, profilePictureUrl, color, fromnewsfeed} = props;
    const [t] = useTranslation();
    let sharedPostType = null;

    const [postData, setnewPost] = useState({
        text: '',
        permission: 'public',
    });
    const handlePermision = (permission) => {
        setnewPost({ ...postData, permission });
    }

    const newPost = (e) => {
        e.preventDefault();
        fromnewsfeed ? sharePost(post.postId, postData, 'newsFeed') : sharePost(post.postId, postData, 'userPosts',);
        close();
    };

    switch (post.postType) {
        case 'media':
            sharedPostType = (
                <div className='post-container'>
                    <MediaPost post={post} actions={{}} />
                </div>
            );
            break;
        case 'share':
            sharedPostType = (
                <div className='post-container'>
                    <SharedPost post={post} actions={{}} />
                </div>
            );
            break;

        case 'answer':
            sharedPostType = (
                <div className='post-container'>
                    <AnswerPost post={post} actions={{}} />
                </div>
            );
            break;
    }
    return (
        <div className="popup sharePost-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog share-new-post">
                <form className='share-post-form' onSubmit={e => newPost(e)}>
                    <div className="popup-header">
                        <div className='userColumn'>
                            <ImageBox className='shared-header-image' image={profilePictureUrl} borderColor={color} />
                        </div>
                        <div className='formColumn'>

                            <div className='create-new-post-body'>
                                <div className='create-new-post-container'>
                                    <textarea
                                        className='create-new-post-input'
                                        placeholder={t('Write something about the post')}
                                        name='newPostText'
                                        value={postData.text}
                                        onChange={(e) => setnewPost({ ...postData, text: e.target.value })}
                                    />
                                    <select className='post-permisions' onChange={(e) => handlePermision(e.target.value)}>
                                        <option value={'public'}>{t('Public')}</option>
                                        <option value={'friends'}>{t('Friends')}</option>
                                        <option value={'private'}>{t('Private')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='popup-body'>
                        {sharedPostType}
                    </div>
                    <div className='popup-footer'>
                        <div className='action-button-container'>
                            <Button className='cancel-btn' onClick={close}>Cancel</Button>
                            <Button className='save-btn' onClick={newPost}>Share</Button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
SharePostPopup.propTypes = {
    post: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    sharePost: PropTypes.func.isRequired,
    profilePictureUrl: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    fromnewsfeed: PropTypes.bool,
}
const mapStateToProps = state => {
    const { profilePictureUrl, category, id } = state.user.currentUser;
    return {
        currentUserId: id,
        profilePictureUrl,
        color: category.color,
    }
}

const mapStateToDispatch = dispatch => {
    return {
        sharePost: (postId, postData, fromPage) => dispatch(sharePost(postId, postData, fromPage,)),
    }
};
export default connect(mapStateToProps, mapStateToDispatch)(SharePostPopup);