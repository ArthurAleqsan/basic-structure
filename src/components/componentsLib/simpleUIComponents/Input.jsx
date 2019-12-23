import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';


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