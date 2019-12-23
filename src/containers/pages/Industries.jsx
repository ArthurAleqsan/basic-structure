import React, {memo} from 'react';
import styled, { keyframes } from "styled-components";
import PropTypes from 'prop-types';

const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`;



const Page = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
`;


const IndustriesPageElm = styled(Page)`
  &.page-enter {
    animation: ${slideInRight} 0.5s forwards;
  }
  &.page-exit {
    animation: ${slideOutRight} 0.5s forwards;
  }
`;

// eslint-disable-next-line react/display-name
export const Industries = memo((props) => {
    return (
        <IndustriesPageElm {...props}>
            {props.children}
        </IndustriesPageElm>
    )
});
Industries.propTypes = {
    children: PropTypes.object,
};
