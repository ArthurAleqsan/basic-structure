import React from 'react';
import { ImageBox } from './ImageBox';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const [t] = useTranslation();
    const year = new Date().getFullYear;
    return (
        <footer>
            <ImageBox height='80px' width='80px' image='/assets/images/home.png' borderColor='unset' />
            <div className='copyright-container'>
                <div>{t(`Copyright`)} &copy; {year} {t('Mayro IT Outsourcing Compnay.')}</div>
                <p>{t('All Rights Reserved.')}</p>
            </div>
        </footer>
    )
};
export default Footer;
