import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import SearchFriendsFromOtherCategory from '../../components/friends/searchFriendsFromOtherCategory';
import SearchFriendsFromCategory from '../../components/friends/searchFriendsFromCategory';
import { searchUser } from '../../store/user/user.actions';
import SugestedFriendsColomn from './sugestedFriendsColomn';

const SearchFriends = props => {
    const { searchUser, query } = props;
    const [t] = useTranslation();
    const [activeTab, toggleTab] = useState('fromCategory');
    let searchBody = null;
    const handleClick = (tab) => {
        toggleTab(tab);
        switch (tab) {
            case 'fromOtherCategory':
                searchUser({ ...query, other: true, subcategoryId : '', })
                break;
            default:
                searchUser({ ...query, other: false })
        }
    };
    switch (activeTab) {
        case 'fromOtherCategory':
            searchBody = <SearchFriendsFromOtherCategory />;
            break;
        default:
            searchBody = <SearchFriendsFromCategory />;
    }
    return (
        // <div>
        <div className='friends-container search-friends-container'>
            <div className = 'search-friends-contnent'>
                <div className='friends-header'>
                    <div className={`friends-nav-tab ${activeTab === 'fromCategory' ? 'active' : ''}`} onClick={() => handleClick('fromCategory')}>{t('Results for your category')}</div>
                    <div className={`display-none friends-nav-tab ${activeTab === 'fromOtherCategory' ? 'active' : ''}`} onClick={() => handleClick('fromOtherCategory')}>{t('Other Categories')}</div>
                </div>
                {searchBody}
            </div>
            <SugestedFriendsColomn />

        </div>
        // </div>

    )
};
SearchFriends.propTypes = {
    searchUser: PropTypes.func.isRequired,
    query: PropTypes.object,
};

const mapStateToProps = state => ({
    foundedUsers: state.user.foundedUsers,
    query: state.user.query,
    categoryId: state.user.currentUser.category.id,
    subCategories: state.user.subCategories,
});

const mapDispatchToProps = dispatch => ({
    // getSubCategoriesForUserSettings: (id) => dispatch(getSubCategoriesForUserSettings(id)),
    searchUser: (query) => dispatch(searchUser(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriends);