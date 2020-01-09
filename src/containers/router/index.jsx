import React, { useRef, useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { Carousel } from 'antd';


import ParalaxMain from './../../components/ParalaxMain';
import Header from './../../components/componentsLib/Header';
import { SocialBtn } from '../../components/componentsLib/socialBtn';
import Home from '../pageContents/home/Home';
import HomeSecond from '../pageContents/home/Home.second';
import Footer from '../../components/componentsLib/Footer';
import IndustriesSecond from '../pageContents/industries/Industries.second';
import Services from '../pageContents/services/Services';
import { setPageRecursive } from '../../util/helpers';
import CareersSecondView from '../pageContents/careers/Careers.secondView';
import FirstViewWrapper from '../pageContents/FirstViewWrapper';


const MainRouter = () => {
    const carouselRef = useRef(null);
    const [showThirdSaction, setShowThirdSaction] = useState(false);
    const [pageIndex, setPageIndex] = useState();
    const socials = ['facebook', 'twitter', 'linkedin'];
    const links = ['https://www.facebook.com/it.mayro/', 'https://twitter.com/MAYRO_COMICS', 'https://www.linkedin.com/company/teamath/about/'];
    useEffect(() => {
        const careersSection = document.querySelectorAll('[data-index]')[4];
        switch (location.pathname) {
            case '/':
                if (pageIndex === 0) return
                carouselRef.current.goTo(0);
                setPageRecursive(0, pageIndex, carouselRef.current);
                setPageIndex(0);
                setTimeout(() => setShowThirdSaction(true), 100);
                careersSection.style.height = '100%';
                break;
            case '/industries':
                if (pageIndex === 1) return
                carouselRef.current.goTo(1);
                setPageRecursive(1, pageIndex, carouselRef.current);
                setPageIndex(1);
                setTimeout(() => setShowThirdSaction(false), 100);
                careersSection.style.height = '100%';

                break;
            case '/services':
                if (pageIndex === 2) return
                carouselRef.current.goTo(2);
                setPageRecursive(2, pageIndex, carouselRef.current);
                setPageIndex(2);
                setTimeout(() => setShowThirdSaction(false), 100);
                careersSection.style.height = '100%';

                break;
            case '/careers':
                if (pageIndex === 3) return
                carouselRef.current.goTo(3);
                setPageRecursive(3, pageIndex, carouselRef.current);
                setPageIndex(3);
                setTimeout(() => setShowThirdSaction(false), 100);
                careersSection.style.height = 'auto';
                break;
        }
    });

    return (
        <div className='main-container'>
            <div>
                <Header />
                <div className='main-content'>
                    <Carousel dots={false} ref={carouselRef} className={showThirdSaction ? 'show-third-section' : 'without-third-section'}>
                        <ParalaxMain >
                            <Home />
                            <HomeSecond />
                        </ParalaxMain>
                        <ParalaxMain>
                            <FirstViewWrapper
                                coverText='Industries'
                                fromPage='industries'
                                firstHeaderText='Give Us the Problem,'
                                secondHeaderText='Take the Solution!'
                                desc='We deliver end to end business and technology transformation, taking advantage of agile methodologies, proven customer collaboration structures, engineering superiority tools and robust teams.'
                            />
                            <IndustriesSecond />
                        </ParalaxMain>
                        <Services />
                        <ParalaxMain className = 'careers-section'>
                            <FirstViewWrapper
                                coverText='Careers'
                                firstHeaderText='Join Us'
                                desc='We’re youthful, inventive, emotional, witty, wacky, and in particular FUNNY (all right perhaps not that
                                      funny). You will see, being MAYRO is cool.
                                      Don’t lose your chance, apply now.'
                    />
                            <CareersSecondView />
                        </ParalaxMain>
                    </Carousel>
                    <div className='social-btn-container'>
                        {socials.map((social, index) => <SocialBtn key={index} type={social} link={links[index]} />)}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default withRouter(MainRouter);
