import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { ImageBox } from '../../../components/componentsLib/ImageBox';
import ImagePopup from '../../../components/popups/imagePopup';
import { getMedia } from './../../../store/media/media.actions';
import VideoBox from './../../../components/componentsLib/videoBox';
import PostPopup from '../../../components/popups/postPopup';
import InfiniteScroll from './../../../components/infiniteScroll/InfiniteScroll';

const UserPhotos = props => {
    const { media, mediaType = 'photo', getMedia, user } = props;
    const [newPostPopup, setPopup] = useState(null);

    useEffect(() => {
        getMedia(mediaType, 0);
    }, [mediaType]);

    const imagesArr = media.map(m => m.url);
    const { userId, currentUserId } = props;
    const [t] = useTranslation();
    const [imagePopup, setPopUpState] = useState(null);
    const closePostPopUp = () => {
        setPopup(null);
    };

    const [uploadPlaceholder, title, addVideoContainerClass] = useMemo(() => {
        return mediaType === 'photo' ? ['/assets/images/icons/add-new-photo.svg', 'Photo', ''] : ['/assets/images/icons/add-new-video.svg', 'Video', 'videoplayer-container'];
    }, [mediaType]);

    return (
        <div className='media-container'>
            <div className='media-header'>{t(title)}</div>

            <div>
                <InfiniteScroll
                    globalScroll={true}
                    handleLoadMore={() => getMedia(mediaType)}
                >
                    <div className='media-body'>
                        {userId === currentUserId && (
                            <div className={`add-image-container ${addVideoContainerClass}`} onClick={() => {
                                setPopup((<PostPopup
                                    type={title} close={closePostPopUp} />))
                            }}
                            >
                                <ImageBox className={`${title}s-image-container add-${title}-box`}
                                    image={uploadPlaceholder}
                                    name={t(`Add New ${title}`)}

                                />
                            </div>
                        )}
                        {media.length > 0 && media.map(item => {
                            const { url } = item;
                            return mediaType === 'photo'
                                ? <ImageBox
                                    id={imagesArr.indexOf(url)}
                                    key={item.mediaId}
                                    className='Photos-image-container'
                                    image={url}
                                    onClick={() => setPopUpState(
                                        <ImagePopup
                                            index={event.target.id}
                                            close={() => setPopUpState(null)}
                                            imagesArr={imagesArr}
                                            mediaPost={item}
                                            user={user ? user : null}
                                            mediaType={mediaType}
                                        />)
                                    }

                                />
                                : <VideoBox
                                    key={url}
                                    url={url}
                                    id={imagesArr.indexOf(url)}
                                    openVideoPopup={() => {
                                        setPopUpState(
                                            <ImagePopup
                                                index={event.target.id}
                                                className='videoPopup'
                                                close={() => setPopUpState(null)}
                                                type={'video'}
                                                mediaPost={item}
                                                user={user ? user : null}
                                                mediaType={mediaType}
                                                imagesArr={imagesArr}
                                            />)
                                    }}
                                />

                        })}
                    </div>

                </InfiniteScroll>

            </div>
            {imagePopup}
            {newPostPopup}
        </div>
    )
};

UserPhotos.propTypes = {
    userId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    media: PropTypes.array.isRequired,
    getMedia: PropTypes.func.isRequired,
    mediaType: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    const { user, currentUser } = state.user;
    const { media } = state.media;

    return {
        userId: user ? user.id : '',
        currentUserId: currentUser.id,
        media,
        user
    }
};

const mapActions = dispatch => bindActionCreators({
    getMedia,
}, dispatch);


export default connect(mapStateToProps, mapActions)(UserPhotos);