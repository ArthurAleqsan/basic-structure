import React from 'react';
import PropTypes from 'prop-types';

const PanelSection = ({ id, panelSectionHeader, ordered, listOfStrings, unOrderedText, }) => {
    return (
        <div id={id}>
            <p className='spanel-section-header'>{panelSectionHeader}</p>
            {ordered ? listOfStrings.map(str => <p key={str}>
                {str}
            </p>) : <div>{unOrderedText}</div>}
        </div>
    )
};
PanelSection.propTypes = {
    id: PropTypes.number.isRequired,
    panelSectionHeader: PropTypes.string.isRequired,
    ordered: PropTypes.bool,
    listOfStrings: PropTypes.array,
    unOrderedText: PropTypes.string,
};
export default PanelSection;
