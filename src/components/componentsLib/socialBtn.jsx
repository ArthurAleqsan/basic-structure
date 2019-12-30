import React, { memo } from 'react';
import PropTypes from 'prop-types';


// eslint-disable-next-line react/display-name
export const SocialBtn = memo(({ type, link }) => {
    return <div className='social-icon-container'>
        <a href={`${link}`} target="_blank">
            <img src={`/assets/images/socials/${type}.svg`} />
        </a>
    </div>
});
SocialBtn.propTypes = {
    type: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};


