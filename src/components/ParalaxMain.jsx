import React, { useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import animateScrollTo from 'animated-scroll-to';




const ParalaxMain = ({ children, className }) => {
    const firstPageOffsetHeight = window.innerHeight;
    let position = 0;
    useEffect(() => {
        window.onscroll = () => handleScroll();
        return () => { }
    }, []);
    const handleScroll = () => {

        if (window.scrollY > position && position < firstPageOffsetHeight) {
            animateScrollTo(firstPageOffsetHeight);
        }
        else if (window.scrollY < firstPageOffsetHeight) {
            animateScrollTo(0);
        }
        position = window.scrollY;
    };
    return (<div style={{ position: 'relative' }} className={className ? className : 'paralax-main'}>
        <div className='block'>
            <Fade top opposite>
                {children[0]}
            </Fade>
        </div>
        <div className='block'>
            <Fade top opposite>
                {children[1]}
            </Fade>
        </div>

    </div>
    )
};
ParalaxMain.propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
};
export default ParalaxMain;