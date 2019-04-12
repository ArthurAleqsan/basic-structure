import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Link } from 'react-router-dom';
import { getUsersNewsFeed, likePost, unLikePost, getPostById, removePost, editPost } from './../../../store/posts/post.actions';
import { getComments, addComment, editComment, removeComment } from './../../../store/comments/comments.actions';
import Loading from './../../../components/componentsLib/Loader';
import SharedPost from './../../../components/posts/typeOfPosts/sharedPost';
import MediaPost from './../../../components/posts/typeOfPosts/mediaPost';
import AnswerPost from './../../../components/posts/typeOfPosts/answerPost';
import PostFooter from './../../../components/posts/postFooter';
import PostComments from './../../../components/posts/postsTemplates/postComments';
import PostHeader from './../../../components/posts/postHeader';
import Loader from './../../../components/componentsLib/Loader';
import { ImageBox } from './../../../components/componentsLib/ImageBox';
import SimplePost from './../../../components/posts/postsTemplates/simplePost';
import InfiniteScroll from './../../../components/infiniteScroll/InfiniteScroll';

const NewsFeed = props => {
    const { newsFeed, getPosts, likePost, unLikePost,
        getSinglePost, removePost, editPost, currentUserId,
        suggestedFriends, getComments, addComment, comments,
        editComment, removeComment } = props;
    const [t] = useTranslation();

    const [toggleShowingComments, toggleShowing] = useState({});

    useEffect(() => {
        getPosts(0);
    }, []);

    return (
        <InfiniteScroll
            handleLoadMore={() => getPosts()}
            globalScroll={true}
        >
            <p className='post-column-header'>{t('Posts')}</p>
            {newsFeed && newsFeed.length > 0 ? newsFeed.map((post, index) => {
                if (index === 2) {
                    return (<div key={index} className='suggested-friends-for-responsive'>
                        <p className='right-column-header suggested-friends-for-responsive'>{t('Suggested Friends')}</p>
                        <div className='suggested-friends-for-responsive-friends-container'>
                            {suggestedFriends && suggestedFriends.length > 0 ? suggestedFriends.map(suggestedFriend => (
                                <Link key={suggestedFriend.id} to={`/${suggestedFriend.id}`}>
                                    <ImageBox
                                        className='frends-image-box tablet-frends-image-box'
                                        name={`${suggestedFriend.firstName} ${suggestedFriend.lastName}`}
                                        image={suggestedFriend.profilePictureUrl}
                                        users={suggestedFriend.category.name}
                                        borderColor={suggestedFriend.category.color}
                                    />
                                </Link>
                            )
                            )
                                : (<Loader />)
                            }
                        </div>
                    </div>)
                }
                switch (post.postType) {
                    case 'text':
                        return (
                            <div key={post.postId} className='post-container'>
                                <PostHeader post={post} actions={{ removePost, editPost }} currentUserId={currentUserId} />
                                <SimplePost post={post} actions={{ getSinglePost }} />
                                <PostFooter post={post} actions={{ likePost, unLikePost, toggleShowing, getComments, addComment }} />
                                {toggleShowingComments.postId === post.postId && comments[post.postId]
                                    && (<PostComments
                                        commentedPostId={post.postId}
                                        currentUserId={currentUserId}
                                        comments={comments[post.postId]}
                                        actions={{ editComment, removeComment }}
                                    />)
                                }
                            </div>
                        );
                    case 'media':
                        return (
                            <div key={post.postId} className='post-container'>
                                <PostHeader post={post} actions={{ removePost, editPost }} fromnewsfeed={true} currentUserId={currentUserId} />
                                <MediaPost post={post} actions={{ getSinglePost }} />
                                <PostFooter post={post} actions={{ likePost, unLikePost, toggleShowing, getComments, addComment }} fromnewsfeed={true} />
                                {toggleShowingComments.postId === post.postId && comments[post.postId]
                                    && (<PostComments
                                        commentedPostId={post.postId}
                                        currentUserId={currentUserId}
                                        comments={comments[post.postId]}
                                        actions={{ editComment, removeComment }}
                                    />)
                                }
                            </div>
                        );
                    case 'share':
                        return (
                            <div key={post.postId} className='post-container'>
                                <PostHeader post={post} actions={{ removePost, editPost }} fromnewsfeed={true} currentUserId={currentUserId} />
                                <SharedPost post={post} actions={{ getSinglePost }} />
                                <PostFooter post={post} actions={{ likePost, unLikePost, toggleShowing, getComments, addComment }} fromnewsfeed={true} />
                                {toggleShowingComments.postId === post.postId && comments[post.postId]
                                    && (<PostComments
                                        commentedPostId={post.postId}
                                        currentUserId={currentUserId}
                                        comments={comments[post.postId]}
                                        actions={{ editComment, removeComment }}
                                    />)
                                }
                            </div>
                        );
                    case 'answer':
                        return (
                            <div key={post.postId} className='post-container' >
                                <PostHeader post={post} actions={{ removePost, editPost }} fromnewsfeed={true} currentUserId={currentUserId} />
                                <AnswerPost post={post} actions={{ getSinglePost }} />
                                <PostFooter post={post} actions={{ likePost, unLikePost, toggleShowing, getComments, addComment }} />
                                {toggleShowingComments.postId === post.postId && comments[post.postId]
                                    && (<PostComments
                                        commentedPostId={post.postId}
                                        currentUserId={currentUserId}
                                        comments={comments[post.postId]}
                                        actions={{ editComment, removeComment }}
                                    />)
                                }
                            </div>
                        );

                }
            }) : (<Loading />)}
        </InfiniteScroll>
    )
};
NewsFeed.propTypes = {
    newsFeed: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    unLikePost: PropTypes.func.isRequired,
    getSinglePost: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    currentUserId: PropTypes.string.isRequired,
    suggestedFriends: PropTypes.any,
    comments: PropTypes.object,
};
const mapStateToProps = state => {
    const { newsFeed } = state.posts;
    const suggestedFriends = state.friends.suggested;
    return {
        newsFeed,
        currentUserId: state.user.currentUser.id,
        suggestedFriends,
        comments: state.comments,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getPosts: (offset) => dispatch(getUsersNewsFeed(offset)),
        likePost: (postId, ) => dispatch(likePost(postId)),
        unLikePost: (postId, ) => dispatch(unLikePost(postId)),
        getSinglePost: (postId) => dispatch(getPostById(postId)),
        removePost: (postId, fromPage, userId) => dispatch(removePost(postId, fromPage, userId)),
        editPost: (postId, data) => dispatch(editPost(postId, data)),
        getComments: (postId, fromPost) => dispatch(getComments(postId, fromPost)),
        addComment: (postId, comment,) => dispatch(addComment(postId, comment, 'newsFeed')),
        editComment: (postId, commentId, commentText, isPostComment) => dispatch(editComment(postId, commentId, commentText, isPostComment)),
        removeComment: (postId, commentId, ) => dispatch(removeComment(postId, commentId, 'newsFeed')),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
