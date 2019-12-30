import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';

import { ImageBox } from '../../../components/componentsLib/ImageBox';
import CoverName from '../../../components/componentsLib/coverName';

const Home = () => {
    const [t] = useTranslation();

    const currentRef = useRef(null)
    return (
        <div ref={currentRef} className='home-page'>
                <div className='page-first-view-left-container'>
                    <CoverName coverName='home' transform='rotate(-90deg)' />
                    <div className='left-row'>
                        <div className='big-header'>
                            <p className='first-header'>{t(`We Are Mayro`)}</p>
                            <p className='second-header'>{t(`An IT Outsourcing Company`)}</p>
                        </div>

                        <div className='arrow'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <Tilt
                    options={{
                        max: 25,
                        speed: 500
                    }}
                    className='tilt-container'
                >
                    <div className='Tilt-inner'>
                        <ImageBox height='100%' width='80%' image='/assets/images/home.png' borderColor='unset' />
                    </div>
                </Tilt>

        </div>
    )
}

export default Home;
