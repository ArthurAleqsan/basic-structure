import React from 'react';
import PropTypes from 'prop-types';
import ImagePost from './../postsTemplates/imagePost';
import VideoPost from './../postsTemplates/videoPost';
import MixedMediaPost from './../postsTemplates/mixedMediaPost';

const MediaPost = props => {
    const { post, } = props;
    let postType = null;
    let mediatype = null;
    if(post.mediaArray.every(post => post.mediaType === 'photo' )){
        mediatype = 'photo'
    } else if(post.mediaArray.every(post => post.mediaType === 'video' )) {
        mediatype = 'video'
    } else {
        mediatype = 'mixed'
    }

    switch (mediatype) {
        case 'photo':
            postType = (<ImagePost post={post}  />);
            break;
        case 'video':
            postType = (<VideoPost post={post} />);
            break;
        case 'mixed':
            postType = (<MixedMediaPost post={post} />);
            break;

    }

    return (
        <div>
            {postType}
        </div>
    )
}
MediaPost.propTypes = {
    post: PropTypes.object.isRequired,
};
export default MediaPost;