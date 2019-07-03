import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledCheckbox = styled.input.attrs(disabled => ({
    type: 'text',
    disabled: disabled || false,
}))`
border-radius: ${props => props.size};
width : ${props => props.size};
height : ${props => props.size};
border : 1px solid ${props => props.border};
cursor : ${props => props.cursor};
background-image : url('/assets/images/checked.png');
background-position: center;
background-repeat: no-repeat;
background-color: ${props => props.backgroundColor};
caret-color: ${props => props.caret};
`;
StyledCheckbox.defaultProps = {
    size: '20px',
    border: 'var(--hiroColor)',
    cursor: 'pointer',
    caret: 'transparent',
};
// eslint-disable-next-line react/display-name
export const Checkbox = memo(props => {
    const { backgroundColor, border, onClick, id, disabled, value, className, caret } = props;
    return <StyledCheckbox id={id} caret={caret} border={border} backgroundColor={backgroundColor} onClick={onClick}
        disabled={disabled} value={value} className={className} />
});
Checkbox.propTypes = {
    backgroundColor: PropTypes.string,
    border: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.string,
    disabled: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    caret: PropTypes.string,
};