import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { connect } from 'react-redux';

import { ImageBox } from './../../components/componentsLib/ImageBox';
import Loader from './../../components/componentsLib/Loader';
import { getSuggested } from './../../store/friends/friends.actions';
import { Link } from 'react-router-dom';

const SuggestedFriends = props => {
    const { items, getItems, friendsArr } = props;
    if (!items) {
        friendsArr.length > 0 ? getItems(0, 10, true) : getItems(0, 10, false);
    }
    const [t] = useTranslation();
    return (
        <div className='column right-column'>
            <p className='right-column-header'>{t('Suggested Friends')}</p>
            <div className='right-column-body'>
                {items && items.length > 0 ? items.map(item => (
                    <Link key={item.id} to={`/${item.id}`}>
                        <ImageBox className='frends-image-box'
                            name={`${item.firstName} ${item.lastName}`}
                            image={item.profilePictureUrl}
                            users={item.category.name}
                            borderColor={item.category.color}
                        />
                    </Link>)
                    ):
                    (<Loader />)
                }

            </div>
        </div>
    )
};

SuggestedFriends.propTypes = {
    items: PropTypes.any,
    getItems: PropTypes.func.isRequired,
    friendsArr: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => {
    const { suggested: items } = state.friends;
    const { friends: friendsArr, } = state.user.currentUser;

    return {
        items,
        friendsArr,
    }
};

const mapActions = (dispatch) => {
    return {
        getItems: (offset, limit, friendsOfFriend) => dispatch(getSuggested(offset, limit, friendsOfFriend)),
    }
};

export default connect(mapStateToProps, mapActions)(SuggestedFriends);