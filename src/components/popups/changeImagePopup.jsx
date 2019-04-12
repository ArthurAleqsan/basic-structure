import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { ImageBox } from '../componentsLib/ImageBox';
import { Button } from '../componentsLib/simpleUiComponents';
import { changeUserSettingsFields, setUserSettings } from '../../store/user/user.actions';
import { UploadFile } from '../componentsLib/uploadFile';
import {getMedia} from "../../store/media/media.actions";
import InfiniteScroll from './../infiniteScroll/InfiniteScroll';

const ChangeImagePopup = props => {
    const { close, color, setPhoto, media, getMedia } = props;
    const [t] = useTranslation();
    useEffect(() => {
        getMedia('photo',0)
    }, []);
    return (
        <div className="popup main-container-popup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog uploadImage">
                <div className='popup-header'>{t('Choose from your photos or ')}
                    <div className='upload-from-pc-link'>
                        {t('upload from computer')}
                       <UploadFile />
                    </div>
                </div>
                <InfiniteScroll handleLoadMore={() => getMedia('photo')} className='popup-body'>
                    {media.map((image) => {
                        return <ImageBox key={image.url} className='upload-image'
                                         image={image.url} borderColor={color}
                                         onClick={() => setPhoto(image.url)} />
                    })}
                </InfiniteScroll>
                <div className='popup-footer'>

                    <div className='action-button-container'>
                        <Button className='cancel-btn' onClick={close}>{t('Cancel')}</Button>
                        <Button className='save-btn' onClick={close}>{t('Save')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

ChangeImagePopup.propTypes = {
    close: PropTypes.func.isRequired,
    imageUrl: PropTypes.string,
    color: PropTypes.string,
    changeUserSettingsFields: PropTypes.func.isRequired,
    setUserSettings: PropTypes.func.isRequired,
    getMedia: PropTypes.func.isRequired,
    media: PropTypes.array.isRequired,
    setPhoto: PropTypes.func.isRequired,
    
};

const mapStateToProps = state => {
    const {media = []} = state.media;
    return {
        color: state.user.currentUser.category.color,
        media,        
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    changeUserSettingsFields,
    setUserSettings,
    getMedia,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangeImagePopup);