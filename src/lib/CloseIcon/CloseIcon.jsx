import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../FontIcons';

const CloseIcon = ({ onClick, color, className }) => (
    <ClearIconWrapper className={className} onClick={onClick}>
        <Icon name="close" size="32px" color={color} />
    </ClearIconWrapper>
);

CloseIcon.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

CloseIcon.defaultProps = {
    onClick: () => {},
    className: '',
    color: '',
};

const ClearIconWrapper = styled.div`
    top: 16px;
    right: 16px;
    position: absolute;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        text-decoration: none;
    }
`;

export default CloseIcon;
