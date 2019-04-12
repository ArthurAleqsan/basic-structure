import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';

const SelectStepCheckbox = props => {
    const { step, desc, onClick, activeStep, hasError } = props;
    const [t] = useTranslation();
    const hasErrorClass = hasError ? 'inValid-checkbox' : '';
    const activeClass = step === (activeStep + '/3') ? 'active-checkbox ' : '';
    return (
        <div className='select-checkbox-container'>
            <div className="info">{step}</div>
            <div>
                <div
                    id={step}
                    className={`input ${activeClass} ${hasErrorClass}`}
                    onClick={onClick}
                >
                    {step !== '3/3' ? <div className='vl' /> : null}
                </div>
            </div>

            <div className="info">{t(desc)}</div>
        </div>

    )
};
SelectStepCheckbox.propTypes = {
    step: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    activeStep: PropTypes.number.isRequired,
    hasError: PropTypes.any,
};

export default SelectStepCheckbox;

