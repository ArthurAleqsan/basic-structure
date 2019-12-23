import React, { memo } from 'react';
import styled, { keyframes } from "styled-components";
import PropTypes from 'prop-types';


const slideInLeft = keyframes`
  from {
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;
const slideOutLeft = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
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

const HomePageElm = styled(Page)`
  &.page-enter {
    animation: ${slideInLeft} 0.5s forwards;
  }
  &.page-exit {
    animation: ${slideOutLeft} 0.5s forwards;
  }
`;
// eslint-disable-next-line react/display-name
export const HomePage = memo((props) => {
    return (
        <HomePageElm {...props}>
            {props.children}
        </HomePageElm>
    )
});
HomePage.propTypes = {
    children: PropTypes.object,
};