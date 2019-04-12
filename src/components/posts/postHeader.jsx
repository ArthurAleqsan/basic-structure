import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBox } from '../componentsLib/ImageBox';
import FormatedTime from '../formatedTime/FormatedTime';
import { Link } from 'react-router-dom';
import EditPost from '../popups/editPost';

const PostHeader = props => {
    const { fromnewsfeed, currentUserId, actions, post, isCommentHeader, commentedPostId, isPostImage  } = props;
    const { user, createdAt, } = post;
    const isOwnPost = user.userId === currentUserId ? true : false;
    const [editPostPopup, setPopup] = useState(null);
    return (
        <div className='post-header'>
            <div className='post-header-user-column'>
                <Link to={`/${user.userId}`}>
                    <ImageBox className='post-header-image' image={user.profilePictureUrl} />
                </Link>

                <div className='post-header-info'>
                    <Link to={`/${user.userId}`}><p className='post-header-name'>{user.firstName + ' ' + user.lastName}</p></Link>
                    <div className='post-header-date'><FormatedTime value={createdAt} /></div>
                </div>
            </div>
            {isOwnPost && (<div className='post-header-editPost-column'>
                <div className='edit-dots'>
                    <img
                        src='/assets/images/icons/menu.svg'
                        onClick={() => setPopup(<EditPost
                            close={() => setPopup(null)}
                            actions={actions}
                            isCommentHeader={isCommentHeader}
                            fromnewsfeed={fromnewsfeed}
                            post={post}
                            currentUserId={currentUserId}
                            commentedPostId = {commentedPostId}
                            isPostImage ={isPostImage}
                        />)
                        }
                    />
                    {editPostPopup}
                </div>
            </div>)}


        </div>
    )
}
PostHeader.propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    currentUserId: PropTypes.any,
    fromnewsfeed: PropTypes.any,
    isCommentHeader: PropTypes.any,
};
export default PostHeader;