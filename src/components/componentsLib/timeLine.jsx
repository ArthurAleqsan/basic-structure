import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import { Link } from 'react-router-dom';

const TimeLineValue = ({ value }) => {
    if (value === -1) return <p>...</p>;
    return <p>{ value }</p>
};
const TimeLine = props => {
    const { friends, posts, photos, videos, userId } = props;
    const [t] = useTranslation();
    return (
        
        <div className='timeline-nav'>
            <Link to = {`/${userId}/friends`} className='timeline-nav-friends timeline-nav-tab'>
                <TimeLineValue value={friends} />
                <p>{t('Friends')}</p>
            </Link>
            <Link to = {`/${userId}/posts`} className='timeline-nav-posts timeline-nav-tab'>
                <TimeLineValue value={posts} />
                <p>{t('Posts')}</p>
            </Link>
            <Link to = {`/${userId}/photos`} className='timeline-nav-photos timeline-nav-tab'>
                <TimeLineValue value={photos} />
                <p>{t('Photos')}</p>
            </Link>
            <Link to = {`/${userId}/videos`} className='timeline-nav-videos timeline-nav-tab'>
                <TimeLineValue value={videos} />
                <p>{t('Videos')}</p>
            </Link>
        </div>
    )
};

TimeLine.propTypes = {
    friends : PropTypes.any,
    posts : PropTypes.any,
    photos : PropTypes.any,
    videos : PropTypes.any,
    userId : PropTypes.string,
};

export default TimeLine;