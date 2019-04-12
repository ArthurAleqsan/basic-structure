import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Button } from '../componentsLib/simpleUiComponents';
import { createNewPost, } from '../../store/posts/post.actions';

import DropZone from '../fileUpload/DropZone';

const PostPopup = props => {
    const { close, createNewPost, type } = props;
    const [t] = useTranslation();
    const [postData, setNewPost] = useState({
        text: '',
        mediaArray: [],
        permission: 'public',
    });
    const [pending, setPending] = useState(false);

    const addMedia = useCallback((url, pending) => {
        if (url) setNewPost({ ...postData, mediaArray: [...postData.mediaArray, { url }] });
        setPending(pending);
    }, [postData]);

    const removeMedia = useCallback((url, pending) => {
        const newMediaArray = postData.mediaArray.filter((item) => item.url !== url);
        setNewPost({ ...postData, mediaArray: newMediaArray });
        setPending(pending);
    }, [postData]);


    const handlePermission = (permission) => {
        setNewPost({ ...postData, permission });
    };

    const newPost = useCallback(() => {
        createNewPost(postData, type && type.toLowerCase());
        close();
    }, [postData.mediaArray, postData.text, type]);


    const disabled = pending || !postData.text;

    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog create-new-post">
                <form className='new-post-form' >
                    <div className='create-new-post-body'>
                        <div className='create-new-post-container'>
                            <textarea
                                className='create-new-post-input'
                                placeholder={t('Your Post Here')}
                                name='newPostText'
                                value={postData.text}
                                onChange={(e) => setNewPost({ ...postData, text: e.target.value })}
                            />
                            <select className='post-permisions' onChange={(e) => handlePermission(e.target.value)}>
                                <option value={'public'}>{t('Public')}</option>
                                <option value={'friends'}>{t('Friends')}</option>
                                <option value={'private'}>{t('Private')}</option>
                            </select>
                        </div>
                    </div>

                    <div className='create-new-post-footer'>
                        <div className='create-post-buttons-container'>
                            <DropZone className='drop-zone' handleComplete={(d, pending) => addMedia(d, pending)} remove={(url, pending) => removeMedia(url, pending)} multiple={true}>
                                <div className='add-media-post'>
                                    <i className='add-media' />
                                    {<span>{type || t('Photo/Video')}</span>}
                                </div>
                            </DropZone>
                            <div className='add-media-post smile-container'>
                                <i className='message-popup-smile' />
                                <span>{t('Emojies')}</span>
                            </div>
                        </div>

                        <Button disabled={disabled} type='button' className={`${disabled ? 'btn-disabled' : 'create-post-btn '}`} onClick={() => newPost()}> Post </Button>
                    </div>
                </form>


            </div>
        </div>
    )
};

PostPopup.propTypes = {
    close: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
    getUsersNewsFeed: PropTypes.func.isRequired,
    getUsersPosts: PropTypes.func.isRequired,
    type: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        userId: state.user.currentUser.id,
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createNewPost,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostPopup);