import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBox } from '../../componentsLib/ImageBox';
// import ImagePopup from '../../popups/imagePopup';
import VideoBox from '../../componentsLib/videoBox';

const MixedMediaPost = props => {
    const { text, mediaArray, user } = props.post;
    const [imagePopup, setPopUpState] = useState(null);
    const imagesArr = [];
    const videosArr = [];

    mediaArray.map(mediaPost => {
        mediaPost.mediaType === 'photo' ? imagesArr.push(mediaPost) : videosArr.push(mediaPost);
    });
    const videoUrlsArr = videosArr.map(m => m.url);

    return (
        <div  /* onClick = {getPost} */>
            <div className='post-body'>
                <div className='post-text'>
                    {text}
                </div>
                <div className='post-mediaContent mixed-mediaContent'>
                    <div className='mixed-mediaContent-images-container'>
                        {
                            imagesArr.length < 4 ? imagesArr.map(image => {

                                return (<ImageBox
                                    id={imagesArr.indexOf(image)}
                                    key={image.mediaId}
                                    className='post-image'
                                    image={image.url}
                                    // onClick={() => setPopUpState(<ImagePopup index={event.target.id} user={user} close={() => setPopUpState(null)} imagesArr={imagesArr} isPostImage={true} />)}
                                />)
                            }) : (
                                    <div className='big-media-array-container'>
                                        <ImageBox
                                            key={imagesArr[0].mediaId}
                                            className='post-image'
                                            image={imagesArr[0].url}
                                            // onClick={() => setPopUpState(<ImagePopup index={0} user={user} close={() => setPopUpState(null)} imagesArr={imagesArr} isPostImage={true} />)}
                                        />
                                        <ImageBox
                                            key={imagesArr[1].mediaId}
                                            className='post-image'
                                            image={imagesArr[1].url}
                                            // onClick={() => setPopUpState(<ImagePopup index={1} user={user} close={() => setPopUpState(null)} imagesArr={imagesArr} isPostImage={true} />)}
                                        />
                                        <ImageBox
                                            key={imagesArr[2].mediaId}
                                            className='post-image'
                                            image={imagesArr[2].url}
                                            showImageShadow={true}
                                            shadowCoverImage={' '}
                                            imageShadowText={imagesArr.length - 2 + '+'}
                                            // onClick={() => setPopUpState(<ImagePopup index={2} close={() => setPopUpState(null)} imagesArr={imagesArr} isPostImage={true} />)}
                                            isPostImage={true}
                                            user={user}
                                        />
                                    </div>
                                )

                        }
                    </div>
                    <div className='mixed-mediaContent-videos-container'>
                        {videosArr.map(video => {
                            return (<VideoBox
                                key={video.mediaId}
                                url={video.url}
                                id={videoUrlsArr.indexOf(video.url)}
                                // openVideoPopup={() => {
                                //     setPopUpState(<ImagePopup index={videoUrlsArr.indexOf(video.url)}
                                //         className='videoPopup'
                                //         close={() => setPopUpState(null)}
                                //         type={'video'}
                                //         imagesArr={videoUrlsArr}
                                //         user={user}
                                    // />)
                                // }}
                            />)
                            // return (<VideoBox key={video.mediaId} className='post-image' url={video.url} pause = {e => e.target.pause()}/>)
                        })}
                    </div>
                </div>
            </div>
            {imagePopup}
        </div>
    )
}
MixedMediaPost.propTypes = {
    post: PropTypes.object.isRequired,
};
export default MixedMediaPost;