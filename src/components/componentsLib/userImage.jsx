import React, { useState } from 'react';
import { ImageBox } from './ImageBox';
import PropTypes from 'prop-types';
import SubCategoryPopup from '../popups/subCategoryPopup';
import { connect } from 'react-redux';
import { changeUserSettingsFields, } from '../../store/user/user.actions';
import ImagePopup from '../popups/imagePopup';

//TODO fallback for images

const UserImage = props => {
    const {
        name,
        userCoverPictureUrl,
        userProfilePictureUrl,
        currentUserCoverPictureUrl,
        currentUserProfilePictureUrl,
        currentUserId,
        edit,
        color,
        categoryName,
        subCategoryName,
        subCategories,
        changeUserSettingsFields,
        showChangeImagepopup,
        showImageShadow,
        user
    } = props;
    const userId = (location.pathname.split('/'))[1];
    const [state, setState] = useState({ subCategoryPopup: null, imagePopup: null });
    const editIcon = edit ? 'edit-icon' : 'display-none';
    const openPopup = (val) => {
        edit ? showChangeImagepopup(val) :
            setState({
                ...state,
                imagePopup: (
                    <ImagePopup
                        user={user}
                        imagesArr={event.target.id === 'coverPictureUrl'
                            ? [currentUserId === userId
                                ? currentUserCoverPictureUrl
                                : userCoverPictureUrl]
                            : [currentUserId === userId
                                ? currentUserProfilePictureUrl
                                : userProfilePictureUrl]
                        }
                        close={closePopUp}
                    />
                )
            });

    };
    const closePopUp = () => {
        edit ? setState({ ...state, subCategoryPopup: null }) : setState({ ...state, showChangeImagepopup: null });
    };

    return (
        <div className='user-image-container'>
            <ImageBox
                showImageShadow={showImageShadow}
                imageShadowText={'Edit cover photo'}
                id='coverPictureUrl'
                className='cover-pic'
                name={name}
                image={currentUserId === userId || location.pathname === '/settings' ? currentUserCoverPictureUrl : userCoverPictureUrl}
                onClick={() => openPopup('coverPictureUrl')}
            />
            <ImageBox
                showImageShadow={showImageShadow}
                imageShadowText={'Edit profile photo'}
                id='profilePictureUrl'
                className='profile-pic'
                image={currentUserId === userId || location.pathname === '/settings' ? currentUserProfilePictureUrl : userProfilePictureUrl}
                onClick={() => openPopup('profilePictureUrl')}
                borderColor={color}
            />
            <div className='edit-Subcategory'>
                <div>{categoryName}</div>
                <div
                    className='subCategory'
                >
                    {subCategoryName}
                    <i id='editSubcategory'
                        className={editIcon}
                        onClick={() => setState(
                            {
                                subCategoryPopup: (<SubCategoryPopup
                                    subCategories={subCategories}
                                    close={closePopUp}
                                    color={color}
                                    setSubCategory={changeUserSettingsFields}
                                    location={props.location}
                                />)
                            })
                        }
                    >
                    </i>
                </div>
            </div>
            {state.subCategoryPopup}
            {state.imagePopup}

        </div>
    )
};

UserImage.propTypes = {
    userCoverPictureUrl: PropTypes.string,
    userProfilePictureUrl: PropTypes.string,
    currentUserCoverPictureUrl: PropTypes.string,
    currentUserProfilePictureUrl: PropTypes.string,
    currentUserId: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string.isRequired,
    edit: PropTypes.bool,
    categoryName: PropTypes.string,
    subCategories: PropTypes.array,
    subCategoryName: PropTypes.string,
    onClick: PropTypes.func,
    closePopUp: PropTypes.func,
    showChangeImagepopup: PropTypes.func,
    SetUserSubCategory: PropTypes.func,
    changeUserSettingsFields: PropTypes.func,
    location: PropTypes.string,
    showImageShadow: PropTypes.bool,
    user: PropTypes.object,
};
const mapStateToProp = state => {
    const { user, currentUser } = state.user
    const { profilePictureUrl, coverPictureUrl } = user || {};
    return {
        userProfilePictureUrl: profilePictureUrl,
        userCoverPictureUrl: coverPictureUrl,
        currentUserProfilePictureUrl: currentUser.profilePictureUrl,
        currentUserCoverPictureUrl: currentUser.coverPictureUrl,
        currentUserId: currentUser.id,
        user
    }

};
const mapDispatchToProps = dispatch => ({
    changeUserSettingsFields: (subcategory, value) => dispatch(changeUserSettingsFields(subcategory, value)),
})
export default connect(mapStateToProp, mapDispatchToProps)(UserImage);