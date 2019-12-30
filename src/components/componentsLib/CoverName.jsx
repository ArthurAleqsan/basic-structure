import React from 'react';
import PropTypes from 'prop-types';

const CoverName = ({ coverName, transform }) => {
    return (
        <div  style={{ transform }} className='cover-text'>
            {coverName}
        </div>
    )
};
CoverName.propTypes = {
    coverName: PropTypes.string.isRequired,
    transform: PropTypes.string.isRequired,
};
export default CoverName;