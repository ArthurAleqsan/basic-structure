import React, { memo } from 'react';
import PropTypes from 'prop-types';


// eslint-disable-next-line react/display-name
export const SocialBtn = memo(({ type }) => {
    return <div className='social-icon-container'>
        <img src={`/assets/images/socials/${type}.svg`} />
    </div>
});
SocialBtn.propTypes = {
    type: PropTypes.string.isRequired,
};


