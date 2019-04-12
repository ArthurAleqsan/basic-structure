import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NotFound = styled.div`
    display: flex;
    background-color: ${props => props.backgroundColor};
    color: fff;
    width: 100%;
    height: 100%;
`;
NotFound.propTypes = {
    backgroundColor: PropTypes.string,
};
NotFound.defaultProps = {
    backgroundColor: 'var(--hiroColor)',
};
// eslint-disable-next-line react/display-name
export default () => <NotFound>404 Not Found</NotFound>;