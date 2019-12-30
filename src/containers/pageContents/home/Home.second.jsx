import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBox } from '../../../components/componentsLib/ImageBox';
import Location from './Location';

const HomeSecond = () => {

    const currentRef = useRef(null)

    const [t] = useTranslation();
    return (
        <div ref = {currentRef} className='home-second-container'>
            <header>{t('About Us')}</header>
            <div>
                <div className='left-text-container text-container'>
                    <div className='about-img-container'>
                        <ImageBox className='about-img' height='475px' width='475px' image='/assets/images/programming.png' borderColor='unset' />
                    </div>
                    <div className='left-text about-text'>
                        With over 5 years of software product engineering expertise,
                        we make efforts on designing and building repeatable mockups
                        to deliver your revolutions to market using our best notions
                        and tools that range from our own IP to progressively
                        intelligent AI-driven platforms.?
                    </div>

                </div>
                <div className='right-text-container text-container'>
                    <div className='about-img-container'>
                        <ImageBox className='about-img' height='475px' width='475px' image='/assets/images/cloud.png' borderColor='unset' />
                    </div>
                    <div className='right-text about-text'>
                        Band with MAYRO team to win by converting revolutionary ideas to real outcomes.
                        Our start to finish services syndicate business and innovation strategies,
                        outstanding design, technology consulting and finest
                        software engineering to deliver results on top quality.
                    </div>
                </div>
            </div>
            <Location />
        </div>
    )
}

export default HomeSecond;