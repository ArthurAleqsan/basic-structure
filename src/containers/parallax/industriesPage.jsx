import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import IndustriesFirst from '../pageContents/industries/Industries.first';


const ParalaxIndustries = () => {
    const [isActiveFragment, setActive] = useState(null);
    const firstPagePos = window.innerHeight;

    useEffect(() => {
        if (window.scrollY === 0) {
            setActive({
                first: true,
                second: false,
            });
        }
        window.onscroll = () => handleScroll();
    }, []);
    const handleScroll = () => {
        if ((firstPagePos + window.scrollY) >= firstPagePos) {
            setActive({ first: false, second: true, });
        } else {
            setActive({ first: true, second: false, });
        }
    };


    return (<div>
        <Fade top opposite when={isActiveFragment && isActiveFragment.first}>
            <IndustriesFirst />
        </Fade>
    </div>
    )
}
export default ParalaxIndustries;