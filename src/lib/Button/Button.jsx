import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FlexRow from '#lib/FlexRow';

import { fonts } from '#constants/styleConstants';

const BasicButton = styled.button`
    ${fonts.Medium};
    display: flex;
    align-items: center;
    justify-content:center;
    min-width: ${props => (props.round ? '28px' : '110px')};
    height: ${props => (props.round ? '28px' : '40px')};
    padding: ${props => (props.round ? '0px 14px' : '0px 20px')};
    font-size: 14px;
    line-height: 18px;
    border-style: solid;
    border-width: 1px;
    border-radius: ${props => (props.round ? '40px' : '0')};
    cursor: pointer;
    text-decoration: none;
    &:focus {
        outline: none;
    }
`;

const PrimaryBlue = styled(BasicButton)`
    background-color: ${props => (props.disabled ? props.theme.gray : props.theme.secondary.blue)};
    border-color: ${props => (props.disabled ? props.theme.gray : props.theme.secondary.blue)};
    color: ${props => props.theme.white};

    &:active {
        background-color: ${props => (props.disabled ? props.theme.gray : props.theme.secondary.darkBlue)};
        border-color: ${props => (props.disabled ? props.theme.gray : props.theme.secondary.darkBlue)};
    }
`;

const PrimaryWhite = styled(BasicButton)`
    background-color: ${props => (props.disabled ? props.theme.gray : props.theme.white)};
    border-color: ${props => (props.disabled ? props.theme.gray : props.theme.white)};
    color: ${props => props.theme.secondary.blue};

    &:active {
        background-color: ${props => (props.disabled ? props.theme.gray : props.theme.lightGray)};
        border-color: ${props => (props.disabled ? props.theme.gray : props.theme.lightGray)};
    }
`;

const SecondaryBlue = styled(BasicButton)`
    background-color: transparent;
    border: 1px solid ${props => (props.disabled ? props.theme.gray : props.theme.secondary.blue)};
    color: ${props => (props.disabled ? props.theme.gray : props.theme.secondary.blue)};

    &:active {
        border-color: ${props => (props.disabled ? props.theme.gray : props.theme.secondary.darkBlue)};
    }
`;

const SecondaryWhite = styled(BasicButton)`
    background-color: transparent;
    border: 1px solid ${props => (props.disabled ? props.theme.gray : props.theme.white)};
    color: ${props => (props.disabled ? props.theme.gray : props.theme.white)};
`;


const NoStyleButton = styled.button`
    font-size: 14px;
    display: flex;
    align-items: center;
    border: 0;
    cursor:pointer;
    background-color: transparent;
    padding: 0;
    outline: none;
    color: ${props => (props.white ? props.theme.white : props.theme.secondary.blue)}
`;

export const ButtonGroup = props => <FlexRow desktopSpacing="3" tabletSpacing="2" {...props} />;

export default class Button extends React.PureComponent {
    render() {
        const { secondary, white, noStyle } = this.props;

        if (noStyle) {
            return <NoStyleButton {...this.props} />;
        }

        if (secondary && white) {
            return <SecondaryWhite {...this.props} />;
        }

        if (secondary) {
            return <SecondaryBlue {...this.props} />;
        }

        if (white) {
            return <PrimaryWhite {...this.props} />;
        }
        return <PrimaryBlue {...this.props} />;
    }
}

Button.propTypes = {
    secondary: PropTypes.bool,
    white: PropTypes.bool,
    noStyle: PropTypes.bool,
};

Button.defaultProps = {
    secondary: false,
    white: false,
    noStyle: false,
};
