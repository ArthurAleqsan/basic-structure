import React from 'react';
import PropTypes from 'prop-types';
import { ImageBox } from '../componentsLib/simpleUIComponents/ImageBox';

const LocationBox = ({ image }) => {
    return (
        <div className = 'location-image-box'>
            <ImageBox image={image} borderColor='unset' />
        </div>
    )
}
LocationBox.propTypes = {
    image: PropTypes.string.isRequired,
};
export default LocationBox;