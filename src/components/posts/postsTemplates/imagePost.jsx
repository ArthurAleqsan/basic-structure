import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBox } from './../../componentsLib/ImageBox';
// import ImagePopup from './../../popups/imagePopup';

const ImagePost = props => {
    const { text, mediaArray, user } = props.post;
    const [imagePopup, setPopUpState] = useState(null);
    return (

        <div  /* onClick = {getPost} */>

            <div className='post-body'>
                <div className='post-text'>
                    {text}
                </div>
                <div className='post-mediaContent'>
                    {
                        mediaArray.length < 4 ? mediaArray.map(image => {
                            return (<ImageBox
                                id={mediaArray.indexOf(image)}
                                key={image.mediaId}
                                className='post-image'
                                image={image.url}
                                // onClick={() => setPopUpState(<ImagePopup index={event.target.id}user = {user} close={() => setPopUpState(null)} imagesArr={mediaArray} isPostImage={true} />)}
                            />)
                        }) : (
                                <div className='big-media-array-container'>
                                    <ImageBox
                                        key={mediaArray[0].mediaId}
                                        className='post-image'
                                        image={mediaArray[0].url}
                                        // onClick={() => setPopUpState(<ImagePopup index={0}user = {user} close={() => setPopUpState(null)} imagesArr={mediaArray} isPostImage={true} />)}
                                    />
                                    <ImageBox
                                        key={mediaArray[1].mediaId}
                                        className='post-image'
                                        image={mediaArray[1].url}
                                        // onClick={() => setPopUpState(<ImagePopup index={1}user = {user} close={() => setPopUpState(null)} imagesArr={mediaArray} isPostImage={true} />)}
                                    />
                                    <ImageBox
                                        key={mediaArray[2].mediaId}
                                        className='post-image'
                                        image={mediaArray[2].url}
                                        showImageShadow={true}
                                        shadowCoverImage={' '}
                                        imageShadowText={mediaArray.length - 2 + '+'}
                                        // onClick={() => setPopUpState(<ImagePopup index={2} close={() => setPopUpState(null)} imagesArr={mediaArray} isPostImage={true} />)}
                                        isPostImage={true}
                                        user = {user}
                                    />
                                </div>
                            )

                    }
                </div>

            </div>
            {imagePopup}
        </div>

    )
}
ImagePost.propTypes = {
    post: PropTypes.object.isRequired,
};

export default ImagePost;