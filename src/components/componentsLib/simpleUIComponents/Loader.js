import styled from 'styled-components';
import PropTypes from 'prop-types';

const Loader = styled.div`
    display: inline-block;
    width: 64px;
    height: 64px;
    &:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid ${(props) => props.color};
        border-color: ${(props) => props.color} transparent ${(props) => props.color} transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
Loader.propTypes = {
    color: PropTypes.string,
};
Loader.defaultProps = {
    color: 'var(--hiroColor)',
};
export default Loader;