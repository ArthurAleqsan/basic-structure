import React from 'react';
import PropTypes from 'prop-types';

const PanelSection = ({ ordered, panelSectionHeader, panelSectionFooter, listOfStrings, unOrderedText, showFooter }) => {
    return (
        <div>
            <p className='panel-section-header'>{panelSectionHeader}</p>
            {ordered ? listOfStrings.map(str => <p key={str}>
                <span>.</span>
                <span>{str}</span>
            </p>) : <div>{unOrderedText}</div>}
            {showFooter && <div className='panel-section-footer'>{panelSectionFooter.map(str => <p key = {str}>{str}</p>)}</div>}
        </div>
    )
};

PanelSection.propTypes = {
    ordered: PropTypes.bool,
    showFooter: PropTypes.bool,
    panelSectionHeader: PropTypes.string.isRequired,
    panelSectionFooter: PropTypes.string.isRequired,
    listOfStrings: PropTypes.array,
    unOrderedText: PropTypes.string,
};
export default PanelSection;
