import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoBox from './../../componentsLib/videoBox';
import ImagePopup from './../../popups/imagePopup';

const VideoPost = props => {
    const { text, mediaArray, user } = props.post;
    const [imagePopup, setPopUpState] = useState(null);
    const videosArr = mediaArray.map(m => m.url);


    return (
        <div  /* onClick = {getPost} */>
            <div className='post-body'>
                <div className='post-text'>
                    {text}
                </div>
                <div className='post-mediaContent'>
                    {mediaArray.map(video => {
                        return (
                            <VideoBox
                                key={video.mediaId}
                                url={video.url}
                                id={videosArr.indexOf(video.url)}
                                openVideoPopup={() => {
                                    setPopUpState(<ImagePopup index={videosArr.indexOf(video.url)}
                                        className='videoPopup'
                                        close={() => setPopUpState(null)}
                                        type={'video'}
                                        imagesArr={videosArr}
                                        user = {user} />)
                                        
                                }}
                            />


                        )
                    })}
                </div>

            </div>
            {imagePopup}
        </div>

    )
}
VideoPost.propTypes = {
    post: PropTypes.object.isRequired,
};
export default VideoPost;