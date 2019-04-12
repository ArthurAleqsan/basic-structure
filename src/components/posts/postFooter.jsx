import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from './../componentsLib/simpleUiComponents';
import SharePostPopup from '../popups/sharePostPopup';

const PostFooter = props => {
    const { post, actions, fromnewsfeed, } = props;
    const { unLikePost, likePost, toggleShowing, getComments, addComment, } = actions;
    const [comment, setValue] = useState('');
    const [sharePostPopop, setPopup] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addComment(post.postId, comment,);
        setValue('');
        toggleShowing({postId : post.postId, show: true});
        // showComments();
    };

    const handleLike = () => {
        post.liked ? unLikePost(post.postId) : likePost(post.postId);
    };
    const showComments = () => {
        getComments(post.postId, true);
        toggleShowing({postId : post.postId, show: true});
    }; 

    return (
        <div className='post-footer'>
            <form onSubmit = {(e) => handleSubmit(e)}>
                <Input
                    // validation='^([a-zA-Z]{2,200})$'
                    name='comment'
                    placeholder='Comment'
                    value={comment}
                    onChange={(name, value) => setValue([name] = value)}
                    borderColor='#E6E6E6'
                    className='form-input'
                />
            </form>

            <div className='post-footer-icons-container'>
                <div className='post-footer-icons'>
                    <i className={post.liked ? 'like-full' : 'like-icon'} onClick={() => handleLike()}></i>
                    <span className = 'likes'>{post.likeCount > 0 ? post.likeCount : null}</span>
                </div>
                <div className='post-footer-icons'>
                    <i className='comment-icon' onClick = {() => showComments()}></i>
                    <span className = 'comments'>{post.commentCount > 0 ? post.commentCount : null}</span>
                </div>
                <div className='post-footer-icons'>
                    <i className='share-icon' onClick={() => { setPopup(<SharePostPopup fromnewsfeed={fromnewsfeed} post={post} close={() => setPopup(null)} />) }} ></i>
                    <span></span>
                </div>
            </div>
            {sharePostPopop}
        </div>
    )
}
PostFooter.propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    fromnewsfeed: PropTypes.bool,
};
export default PostFooter;