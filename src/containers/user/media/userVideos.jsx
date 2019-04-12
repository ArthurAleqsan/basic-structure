import React from 'react';
import { useTranslation } from 'react-i18next/hooks';
import { ImageBox } from '../../../components/componentsLib/ImageBox';
import { UploadFile } from '../../../components/componentsLib/uploadFile';
import VideoBox from '../../../components/componentsLib/videoBox';

const UserVideos = () => {
    const [t] = useTranslation();
    // fake data for images
    const videosArr = [
        '/assets/videos/videoplayback.mp4',
    ];
    return (
        <div className='media-container'>
            <div className='media-header'>{t('Videos')}</div>

            <div className='media-body'>
                <div className='videoplayer-container'>
                    <ImageBox className='add-video-box' image={'/assets/images/icons/add-new-video.svg'} name={t('Add New Video')} />
                    <UploadFile />
                </div>
                {/* {videosArr.map(path => (
                    <VideoBox key={path} url={path} />
                ))} */}


            </div>
        </div>
    )
}
export default UserVideos;