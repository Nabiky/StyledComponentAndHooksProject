import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../FontIcons';
import * as Text from '#lib/Text/Text';

const ComponentWrapper = styled.div`
    display: flex;
    cursor: pointer;
    color: ${props => props.theme.darkerGray};
    margin-bottom: 8px;
    align-items: center;
`;

const TickboxWrapper = styled.div`
    margin-right: ${props => props.spacing};
    height: ${props => props.boxSize};
`;

const TextWrapper = styled(Text.Label2)`
    font-size: ${props => props.fontSize};
`;

const Checkbox = ({
    onClick,
    spacing,
    checked,
    fontSize,
    children,
}) => (
    <ComponentWrapper onClick={onClick}>
        <TickboxWrapper spacing={spacing}>
            {checked ? (
                <Icon
                    name="checkbox-selected-f"
                />
            ) : (
                <Icon
                    name="checkbox-unselected-f"
                />
            )}
        </TickboxWrapper>
        <TextWrapper fontSize={fontSize}>{children}</TextWrapper>
    </ComponentWrapper>
);

export default Checkbox;

Checkbox.propTypes = {
    onClick: PropTypes.func,
    spacing: PropTypes.string,
    fontSize: PropTypes.string,
    checked: PropTypes.bool,
    children: PropTypes.node,
};

Checkbox.defaultProps = {
    onClick: () => {},
    spacing: '8px',
    fontSize: '16px',
    checked: true,
    children: '',
};
