import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';


const ButtonStyled = styled.button`
  /* background: ${(props) => props.color}; */
  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'unset'};
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px;
  font-size: 16px;
  cursor: ${(props) => props.cursor};
`;

ButtonStyled.defaultProps = {
    color: '#fff',
    uppercase: false,
    cursor: 'pointer',
};

ButtonStyled.propTypes = {
    color: PropTypes.string,
    uppercase: PropTypes.bool,
};

// eslint-disable-next-line react/display-name
export const Button = memo((props) => {
    const [t] = useTranslation();
    return <ButtonStyled {...props} >
        {props.iconImagePath && (<img src = {props.iconImagePath} />)}
        <p>{t(props.children)}</p>
    </ButtonStyled>
});

Button.propTypes = {
    children: PropTypes.string,
    iconImagePath: PropTypes.string,
};
