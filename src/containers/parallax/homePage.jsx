import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';


import Home from './../pageContents/home/Home';
import HomeSecond from './../pageContents/home/Home.second';
import Location from './../pageContents/home/Location';



const ParalaxMain = () => {
    const [isActiveFragment, setActive] = useState(null);
    // const [isActiveFragment, setActive] = useState(null);
    const firstPagePos = window.innerHeight;
    const secondPagePos = 2 * window.innerHeight;
    const thirdPagePos = 3 * window.innerHeight;

    useEffect(() => {
        if (window.scrollY === 0) {
            setActive({
                first: true,
                second: false,
                third: false,
            });
        }
        window.onscroll = () => handleScroll();
        return () => {}
    }, []);
    const handleScroll = () => {
        if ((firstPagePos + window.scrollY) >= firstPagePos && (thirdPagePos - window.scrollY) < secondPagePos + window.scrollY) {
            setActive({ first: false, second: false, third: true });
        } else if (secondPagePos + window.scrollY > secondPagePos) {
            setActive({ first: false, second: true, third: false });
        } else {
            setActive({ first: true, second: false, third: false });
        }
    };


    return (<div>
        <Fade top opposite when={isActiveFragment && isActiveFragment.first}>
            <Home />
        </Fade>
        <Fade top opposite when={isActiveFragment && isActiveFragment.second}>
            <HomeSecond />
        </Fade>
        <Fade top opposite when={isActiveFragment && isActiveFragment.third}>
            <Location />
        </Fade>
    </div>
    )
}
export default ParalaxMain;