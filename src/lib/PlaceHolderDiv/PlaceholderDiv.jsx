import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { prop } from 'styled-tools';

const pulse = keyframes`
    0% {
        background-color: rgba(165, 165, 165, 0.1)
    }
    50% {
        background-color: rgba(165, 165, 165, 0.3)
    }
    100% {
        background-color: rgba(165, 165, 165, 0.1)
    }
`;

const PlaceholderDiv = styled.div`
    width: ${prop('width')};
    height: 16px;
    animation: ${pulse} 1s infinite ease-in-out;
`;

PlaceholderDiv.propTypes = {
    width: PropTypes.string,
};

PlaceholderDiv.defaultProps = {
    width: '100%',
};

export default PlaceholderDiv;
