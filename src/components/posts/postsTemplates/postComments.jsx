import React from 'react';
import PropTypes from 'prop-types';
import PostHeader from '../postHeader';


const PostComments = props => {
    const { comments, currentUserId, actions, commentedPostId, isPostImage} = props;
console.log(comments)
// : {comments = []}
    return (
        <div>
            {comments.length > 0 && (<div>
                {comments.map(comment => {
                    return (<div key={comment.commentId} className='post-body comment-body'>
                        <PostHeader
                            post={comment}
                            fromnewsfeed={true}
                            currentUserId={currentUserId}
                            isCommentHeader={true}
                            actions={actions}
                            commentedPostId={commentedPostId}
                            isPostImage = {isPostImage}
                        />
                        <div className='comment-text-container'>
                            {comment.commentText}
                        </div>
                    </div>)
                })

                }
            </div>)}


        </div>
    )
}
PostComments.propTypes = {
    comments: PropTypes.array.isRequired,
    currentUserId: PropTypes.string.isRequired,
    commentedPostId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};

export default PostComments;