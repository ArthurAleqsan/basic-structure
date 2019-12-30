import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBox } from '../../../components/componentsLib/ImageBox';
import EyeSlider from '../../../components/componentsLib/EyeSlider';

const IndustriesSecond = () => {
    const [t] = useTranslation();
    const industrues = ['Banking And Financial Services', 'Retail And E-Commerce', 'Healthcare', 'Publishing / Advertising',
        'Education and E-Learning', 'Transportation and Logistics', 'Product Companies', 'Travel And Tourism', 'Manufacturing / Automotive'];
    return (
        <div className='industrues-second-view'>
            <div className='left-row'>
                <div className='left-row-text-container row-container'>
                    <p className='left-row-text-container-header'>{t('Media and Entertainment')}</p>
                    <div className='media-section-desc-contrainer'>
                        <div className='left-row-text-container-image-box' >
                            <ImageBox height='90px' width='90px' image='/assets/images/media.png' borderColor='unset' />
                        </div>
                        <p className='left-row-text-container-text'>
                            {t('Get online promotion solutions, social networking development tools, media content distribution channels with the use of the latest trends and tools we bring together all the required media components at one place to ensure your success.')}
                        </p>
                    </div>
                </div>
            </div>
            <div className='right-slider-row'>
                <div className='row-container'>
                    <EyeSlider items={industrues} showedItemsCount={industrues.length} />
                </div>
            </div>
        </div>
    )
};

export default IndustriesSecond;
