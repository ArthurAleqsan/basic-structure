import React from 'react';
import { useTranslation } from 'react-i18next/hooks';

const FooterPrivate = () => {
    const [t] = useTranslation();
  return (
    <div className = 'isSignIn-footer'>
      <p className = 'container'>{t('All rights reserved')}</p>
    </div>
  )
}
export default FooterPrivate;