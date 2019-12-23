import React from 'react';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';

import { Button } from '../../../components/componentsLib/button/Button';
import { ImageBox } from './../../../components/componentsLib/simpleUIComponents/ImageBox';
import { SocialBtn } from './../../../components/componentsLib/simpleUIComponents/socialBtn';

const Home = () => {
    const [t] = useTranslation();

    return (
        <div id='home' className='home-page'>
            <div className='home-content'>
                <div className='left-row'>
                    <div className = ''></div>
                    <div className='big-header'>
                        <span>{t(`IT Outsourcing`)}</span>
                        <br />
                        <span>{t(`Company`)}</span></div>
                    <Button className='contact-btn'>Contact</Button>
                    <div className='arrow'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <Tilt gyroscope={true} tiltMaxAngleX={10} tiltMaxAngleY={15} tiltReverse={true} transitionSpeed={800} className='tilt-container' >
                <div className='Tilt-inner'>
                    <ImageBox height='300px' image='https://i1.rozetka.ua/goods/2039322/blue_rocket_xt30037_images_2039322474.jpg' borderColor='unset' />
                </div>
            </Tilt>
            <div className='social-btn-container'>
                <SocialBtn type='facebook' />
                <SocialBtn type='twitter' />
                <SocialBtn type='linkedin' />
            </div>
        </div>
    )
}

export default Home;
