import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import YourFriends from '../../components/friends/yourFriends';
import SuggestedFriends from '../../components/friends/suggestedFriends';
import Requests from './friends/Requests';

const Friends = props => {
    const { currentUserId, userId,} = props;
    const [t] = useTranslation();
    const [activeTab, toogleTab] = useState(location.search.split('tab=')[1] || 'yourFriends');
    let friendsBody = null;
    const isCurrentUser = currentUserId !== userId ? 'display-none' : '';
    switch (activeTab) {
        case 'suggestedFriends':
            friendsBody = <SuggestedFriends />;
            break;
        case 'requests':
            friendsBody = <Requests />;
            break;
        default:
            friendsBody = <YourFriends />;
    }

    return (

        <div className='friends-container'>
            <div className='friends-header'>
                <div className={`friends-nav-tab ${activeTab === 'yourFriends' ? 'active' : ''}`} onClick={() => toogleTab('yourFriends')}>
                    {userId && currentUserId === userId ? t('Your Friends') : t('Friends')}
                </div>
                <div className={`friends-nav-tab ${isCurrentUser} ${activeTab === 'suggestedFriends' ? 'active' : ''}`} onClick={() => toogleTab('suggestedFriends')}>
                    {t('Suggested Friends')}</div>
                <div className={`friends-nav-tab ${isCurrentUser} ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => toogleTab('requests')}>{t('Requests')}</div>
            </div>
            {friendsBody}
        </div>
    )
};
Friends.propTypes = {
    currentUserId : PropTypes.string, 
    userId : PropTypes.any,
};
const mapStateToProps = state => {
    const { currentUser, user } = state.user || {};
    return {
        currentUserId: currentUser.id,
        userId: user ? user.id : -1, 
    } 
};
export default connect(mapStateToProps)(Friends);