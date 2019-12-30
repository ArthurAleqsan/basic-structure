import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EyeSlider = ({ items = [], showedItemsCount }) => {
    const currentRef = useRef(null);
    const [height, setHeight] = useState(null);
    const [active, setActive] = useState(0);
    useEffect(() => {
        const calculatedHeight = Math.floor(2 * currentRef.current.offsetHeight / showedItemsCount);
        setHeight(calculatedHeight);
    }, []);
    const handleClick = (index) => {
        setActive(index);
    }

    return (
        <div className='eye-slider-container' ref={currentRef}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={active === index ? 'eye-slider-container-item-box active' : 'eye-slider-container-item-box'}
                    style={{ height }}
                    onClick = {() => handleClick(index)}
                >
                    <div className='eye-slider-container-item'>{item}</div>
                    <div className='eye-slider-dots'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                </div>
            ))}
        </div>
    )
};
EyeSlider.propTypes = {
    items: PropTypes.array.isRequired,
    showedItemsCount: PropTypes.number.isRequired,
};
export default EyeSlider;
