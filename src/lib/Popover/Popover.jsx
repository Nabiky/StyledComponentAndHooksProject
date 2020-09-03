import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Wrapper = styled.div`
    display: block;
    background-color: ${props => props.theme.white};
    position: absolute;
    z-index: 999;
    top: 40px;
    ${props => props.popLeft && 'right: 0;'};
    ${props => props.popRight && 'left: 0;'};
    box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 160px;
`;

const Popover = ({
    isDisplayed, popLeft, popRight, ...props
}) => (isDisplayed && <Wrapper popLeft={popLeft} popRight={popRight} {...props} />);

export default Popover;

Popover.propTypes = {
    isDisplayed: PropTypes.bool,
    popLeft: PropTypes.bool,
    popRight: PropTypes.bool,
};

Popover.defaultProps = {
    isDisplayed: true,
    popLeft: true,
    popRight: false,
};
