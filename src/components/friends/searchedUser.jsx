import React from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ImageBox } from '../componentsLib/ImageBox';
import ActionButton from '../componentsLib/actionButton';
import { Link } from 'react-router-dom';

const SearchedUser = props => {
    const { image, name, category, subCategory, color, user, friendsArr, pendingsArr, requestsArr, currentUserCategoryId } = props;
    
    const userCategoryId = user.category.id;

    let actionButtons = null;

    const isFriend = friendsArr.includes(user.id);
    const isPending = pendingsArr.includes(user.id);
    const isRequested = requestsArr.includes(user.id);

    if (isFriend) {
        actionButtons = (<ActionButton user={user} page={'friend'} fromPage = {'search'} />);
    } else if (isPending) {
        if (userCategoryId && currentUserCategoryId === userCategoryId) {
            actionButtons = (<ActionButton user={user} fromCategory={'search'} page={'pending'} fromPage = {'search'} />);
        } else {
            actionButtons = (<ActionButton user={user} fromCategory={false} page={'pending'} fromPage = {'search'} />);
        }
    } else if (isRequested) {
        if (userCategoryId && currentUserCategoryId === userCategoryId) {
            actionButtons = (<ActionButton user={user} page={'requested'} fromPage = {'search'} />);
        } else {
            actionButtons = (<ActionButton user={user} page={'requested'} fromPage = {'search'} />);
        }
    } else {
        if (userCategoryId && currentUserCategoryId === userCategoryId) {
            actionButtons = (<ActionButton user={user} page={'noRelationFromCategory'} fromPage = {'search'} />)
        } else {
            actionButtons = (<ActionButton user={user} page={'noRelationFromAnotherCategory'} fromPage = {'search'} />);
        }
    }

    return (
        <div className='user-container'>
            <div className='user-container-left-colomn'>
                <Link to={`/${user.id}`}>
                    <ImageBox className='user-img' image={image} borderColor={color} />
                    <div className='post-header-info'>
                        <p className='post-header-name'>{name}</p>
                        <p className='post-header-date'>{category}{subCategory ? ',' : ''} {subCategory}</p>
                    </div>
                </Link>
            </div>
            <div className='user-container-right-colomn'>
                {actionButtons}
            </div>
        </div>
    )
}

SearchedUser.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string,
    color: PropTypes.string,
    user: PropTypes.object.isRequired,
    friendsArr: PropTypes.array.isRequired, 
    pendingsArr: PropTypes.array.isRequired, 
    requestsArr: PropTypes.array.isRequired, 
    users: PropTypes.array, 
    currentUserCategoryId: PropTypes.string.isRequired,

};
const mapStateToProps = (state) => {
    const { friends: friendsArr, friendsPending: pendingsArr, friendsRequested: requestsArr, category: currentUserCategory } = state.user.currentUser;
    return {
        currentUserCategoryId: currentUserCategory.id,
        friendsArr,
        pendingsArr,
        requestsArr,
    };
};


export default connect(mapStateToProps)(SearchedUser);