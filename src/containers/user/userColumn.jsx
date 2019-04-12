import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import UserImage from './../../components/componentsLib/userImage';
import TimeLine from './../../components/componentsLib/timeLine';
import { getUserById } from './../../store/user/user.actions';
import ActionButton from '../../components/componentsLib/actionButton';
import { getFriends } from '../../store/friends/friends.actions';

const UserColumn = props => {
    const { bio, friends, posts, photos, videos, name,
            color, categoryMame, subcategoryName, id,
          getItems,  user,} = props;
    const [t] = useTranslation();
    useEffect(() => {
        props.getUser(props.match.params.id);
    }, [props.match.params.id]);
    useEffect(() => {
        getItems(0)
    }, []);
    
    return (
        <div className='column left-column'>
            <UserImage name={name} color={color} categoryName={categoryMame} subCategoryName={subcategoryName} />
            <TimeLine
                userId={props.match.params.id}
                friends={friends}
                posts={posts}
                photos={photos}
                videos={videos}
            />
            {(props.match.params.id !==id ) && <ActionButton user={user} fromPage = {'userColumn'} />}
            <div className='bio'>
                <div className='bio-header'>{t('Bio')}</div>
                <div className='bio-body'>
                    {bio}
                </div>
            </div>
        </div>
    )
};

UserColumn.propTypes = {
    bio: PropTypes.string,
    friends: PropTypes.number,
    posts: PropTypes.number,
    photos: PropTypes.number,
    videos: PropTypes.number,
    name: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    categoryMame: PropTypes.string,
    subcategoryName: PropTypes.string,
    match: PropTypes.any,
    id: PropTypes.string,
    user: PropTypes.object.isRequired,
    currentUserCategoryId: PropTypes.string,
    userCategoryId: PropTypes.string,
    getItems: PropTypes.func.isRequired,
    items: PropTypes.array,
    friendsArr: PropTypes.array.isRequired,
    pendingsArr: PropTypes.array.isRequired,
    requestsArr: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    const { user, posts, media = {} } = state.user;
    const { firstName = '', lastName = '', bio = '', numberOfFriends, category = '', subcategory = '', } = user || {};
    const { videos, photos } = media;
    const { friends: friendsArr, friendsPending: pendingsArr, friendsRequested: requestsArr, category: currentUserCategory } = state.user.currentUser;
    const { friends: items } = state.friends;
    return {
        bio,
        videos: videos ? videos.length : -1,
        photos: photos ? photos.length : -1,
        posts: posts ? posts.length : -1,
        friends: numberOfFriends,
        name: `${firstName} ${lastName}`,
        categoryMame: category.name,
        subcategoryName: subcategory.name,
        color: currentUserCategory.color,
        id: state.user.currentUser.id,
        currentUserCategoryId: currentUserCategory.id,
        userCategoryId: user && user.category.id,
        userId: user && user.id,
        user: user || {},
        items,
        friendsArr,
        pendingsArr,
        requestsArr,
    };
};



const mapActions = (dispatch) => {
    return {
        getUser: (id) => dispatch(getUserById(id)),
        getItems: () => dispatch(getFriends(0)),
    }
};

export default withRouter(connect(mapStateToProps, mapActions)(UserColumn));
