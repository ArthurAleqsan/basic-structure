import React from 'react';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';

import { ImageBox } from '../../../components/componentsLib/ImageBox';

const Location = () => {
    const [t] = useTranslation();
    return (
        <div id='home2' className='our-location-container'>
            <header>{t('Our Locations')}</header>
            <div className='locations-pin-container'>
                <div className='location-box us-location'>
                    <p className='location-box-header'>{t('Glendale')}</p>
                    <div className='address'>
                        <span>+818 792 0888</span>
                        <span>eduard.arustamyan@teamath.org</span>
                        <span>{t('Glendale California')}</span>
                    </div>
                </div>
                <div className='location-box-tilt-container'>
                    <Tilt
                        options={{
                            max: 25,
                            speed: 500
                        }}
                        className='tilt-container'
                    >
                        <div className='Tilt-inner'>
                            <ImageBox height='100%' width='100%' image='/assets/images/location.png' borderColor='unset' />
                        </div>
                    </Tilt>
                </div>
                <div className='location-box am-location'>
                    <p className='location-box-header'>{t('Yerevan')}</p>
                    <div className='address'>
                        <span>+374 99 412112</span>
                        <span>info.@teamath.org</span>
                        <span>{t('Yerevan Armenia')}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Location;
