import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import styled from 'styled-components'

const ButtonStyled = styled.button`
  background: ${(props) => props.color};
  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'unset'};
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => props.cursor};
`;

ButtonStyled.defaultProps = {
    color: 'var(--hiroColor)',
    uppercase: false,
    cursor: 'pointer'
};

ButtonStyled.propTypes = {
    color: PropTypes.string,
    uppercase: PropTypes.bool,
};


export function Button(props) {
    const [t] = useTranslation();
    return <ButtonStyled {...props} >
        {props.iconImagePath && (<img src = {props.iconImagePath} />)}
        <p>{t(props.children)}</p>
    </ButtonStyled>
}

Button.propTypes = {
    children: PropTypes.string,
    iconImagePath: PropTypes.string,
};

//-----------------------------------------------------------------------------------------------
const InputStyled = styled.input.attrs((type, required) => ({
    type: type || 'text',
    required: required || false
}))`
  border-radius: 5px;
  border: 1px solid ${(props) => props.error ? 'red' : props.borderColor};
  padding: 10px;
  font-size: 16px;
`;
InputStyled.propTypes = {
    borderColor: PropTypes.string,
    error: PropTypes.bool,
};
InputStyled.defaultProps = {
    borderColor: 'var(--hiroColor)',
    error: false,
};
// eslint-disable-next-line react/display-name
export const Input = memo((props) => {
    const { onChange: parentOnChange, validation, errorMessage, ...rest } = props;
    const [t] = useTranslation();
    const [error, setError] = useState(false);
    return <InputStyled {...rest} error={error} onChange={(e) => {
        const currentTarget = e.target;
        let error = false;
        if (validation && !(new RegExp(validation)).test(currentTarget.value)) {
            currentTarget.setCustomValidity(t(errorMessage));
            error = true;
        } else {
            currentTarget.setCustomValidity('');
        }
        setError(error);
        parentOnChange(currentTarget.name, currentTarget.value, !error);
    }} />
});
Input.propTypes = {
    validation: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
Input.defaultProps = {
    validation: '',
    errorMessage: 'incorect',
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
// ------------------------------------
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
// ----------------------------------
