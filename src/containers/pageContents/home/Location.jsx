import React from 'react';
import { useTranslation } from 'react-i18next';
import LocationBox from '../../../components/locationBox/LocationBox';

const Location = () => {
    const [t] = useTranslation();
    return (
        <div className='our-location-container'>
            <div className='our-location-container-header-container'>
                <p>{t('Our Locations')}</p>
            </div>
            <div className = 'locations-pin-container'>
                <LocationBox image = '/assets/images/a.jpeg'/>
                <LocationBox image = '/assets/images/a.jpeg'/>
                <LocationBox image = '/assets/images/a.jpeg'/>
            </div>

        </div>
    )
}
export default Location;
