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
                         mediaArray.map(image => {
                            return (<ImageBox
                                id={mediaArray.indexOf(image)}
                                key={image.mediaId}
                                className='post-image'
                                image={image.url}
                                // onClick={() => setPopUpState(<ImagePopup index={event.target.id}user = {user} close={() => setPopUpState(null)} imagesArr={mediaArray} isPostImage={true} />)}
                            />)
                        })
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