import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CoverName from '../../components/componentsLib/coverName';
import Tilt from 'react-parallax-tilt';
import { ImageBox } from '../../components/componentsLib/ImageBox';

const FirstViewWrapper = ({ coverText, fromPage, firstHeaderText, secondHeaderText, desc }) => {
    const [t] = useTranslation();
    return (
        <div className='industrues-first-view'>
            <div className='page-first-view-left-container'>

                <CoverName coverName={coverText} transform='unset' />
                <div className='left-row'>
                    <div className='big-header'>
                        <div className='first-header'>
                            <p>{t(firstHeaderText)}</p>
                            {fromPage === 'industries'}<p>{t(secondHeaderText)}</p>
                        </div>
                        <p className='second-header'>{t(desc)}</p>
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
                    <ImageBox height='100%' width='80%' image='/assets/images/industries.png' borderColor='unset' />
                </div>
            </Tilt>
        </div>
    )
};
FirstViewWrapper.propTypes = {
    coverText: PropTypes.string.isRequired,
    fromPage: PropTypes.string,
    firstHeaderText: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    secondHeaderText: PropTypes.string,
};
export default FirstViewWrapper;
