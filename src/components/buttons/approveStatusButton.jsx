import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';
import { respondFriendRequest } from '../../store/friends/friends.actions';

const ApproveStatusButton = props => {
    const { userId, status, text } = props;
    const [t] = useTranslation();

    const handleApproveButton = () => {
        props.respondFriendRequest(userId, status);
    };
    return (
        <div>
            <Button
                className='btn'
                onClick={handleApproveButton}
                iconImagePath={status ? '/assets/images/icons/add-friend.svg' : '/assets/images/icons/unfriend.svg'}
            >
                {t(text)}
            </Button>
        </div>
    )
};
ApproveStatusButton.propTypes = {
    userId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    respondFriendRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    respondFriendRequest: (userId, status) => dispatch(respondFriendRequest(userId, status)),
});
export default connect(null, mapDispatchToProps)(ApproveStatusButton);