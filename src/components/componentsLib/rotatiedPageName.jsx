import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledContainer = styled.button`
  background: ${(props) => props.bgColor};
  text-transform: ${(props) => props.uppercase ? 'uppercase' : 'unset'};
  color: white;
  opacity: 0.3;
  padding: 10px;
  font-size: 40px;
`;
StyledContainer.defaultProps = {
    color: '#394f8f',
    bgColor: '#394f8f',
};

StyledContainer.propTypes = {
    color: PropTypes.string,
    bgColor: PropTypes.string,
};
// eslint-disable-next-line react/display-name
export const RotatiedPageName = memo(({ name, bgColor, color }) => {
    return (
        <div>

        </div>
    )
});
RotatiedPageName.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    bgColor: PropTypes.string,
};