import React from 'react';
import PropTypes from 'prop-types';
import { ImageBox } from '../../componentsLib/ImageBox';
import FormatedTime from '../../formatedTime/FormatedTime';
import MediaPost from './mediaPost';
import { Link } from 'react-router-dom';

const SharedPost = props => {
    const { postId, createdAt, text, sharedPost } = props.post;
    const { user } = sharedPost;
    return (
        <div className='shared-post-container'>
            <div className='post-header'>
                <Link to={`/${user.userId}`}>
                    <ImageBox className='post-header-image' image={user.profilePictureUrl} />
                </Link>
                <div className='post-header-info'>
                    <Link to={`/${user.userId}`}> <p className='post-header-name'>{user.firstName + ' ' + user.lastName}</p></Link>
                    <div className='post-header-date'><FormatedTime value={createdAt} /></div>
                </div>
            </div>
            <div className='post-body'>
                {text}
                {<MediaPost post={sharedPost} actions={props.actions} />}
            </div>

        </div>
    )
}
SharedPost.propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default SharedPost;