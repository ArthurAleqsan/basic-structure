import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const VideoBox = props => {
    const { url, pause,  openVideoPopup, controls } = props;
    const handleClick = useCallback((e) => {
        if (!openVideoPopup) return;
        ref.current.pause();
        e.preventDefault();
        openVideoPopup();
    } ,[]);
    const ref = useRef(null);
    const [t] = useTranslation();
    return (
        <div className='videoplayer-container' onClick = {pause} >
            <video ref={ref} onClick={handleClick} className='videoplayer' controls controlsList="nodownload">
                <source src={url} type="video/mp4" />
                <source src={url} type="video/ogg" />
                {t('Your browser does not support HTML5 video.')}
            </video>
        </div>
    )
};

VideoBox.propTypes = {
    url: PropTypes.string.isRequired,
    openVideoPopup: PropTypes.func,
};

export default VideoBox;