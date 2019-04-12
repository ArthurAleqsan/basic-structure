import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';
import { removeFriend } from '../../store/friends/friends.actions';

const RemoveButton = props => {
    const { userId } = props;
    const [t] = useTranslation();

    const handleRemoveButton = () => {
        props.removeFriend(userId)
    };
    return (
        <div>
            <Button className='btn remove-btn' onClick={handleRemoveButton} iconImagePath='/assets/images/icons/unfriend.svg'>
                {t('Unfriend')}
            </Button>
        </div>
    )
};
RemoveButton.propTypes = {
    userId: PropTypes.string.isRequired,
    removeFriend: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    removeFriend: (userId) => dispatch(removeFriend(userId)),
});
export default connect(null, mapDispatchToProps)(RemoveButton);