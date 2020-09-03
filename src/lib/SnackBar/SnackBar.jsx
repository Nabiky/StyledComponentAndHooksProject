import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from 'styled-tools';
import CloseIcon from '#lib/CloseIcon';
import ContentWrapper from '#lib/ContentWrapper/ContentWrapper';


const slideUp = keyframes`
    from {
        transform: translateY(140px);
        opacity: 0;
    }

    to {
        transform: translateY(0px);
        opacity: 1;
    }
`;

const SnackBarWrapper = styled.div`
    position: fixed;
    height: 72px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${theme('background-color.bg-white')};
    border-top: 4px solid;
    border-color: ${({ color }) => {
        switch (color) {
            case 'theme-color-primary':
                return theme('mainColorOne');
            case 'orange':
                return theme('primary.orange');
            case 'pink':
                return theme('primary.pink');
            case 'purple':
                return theme('primary.purple');
            case 'green':
                return theme('primary.green');
            default:
                return theme('mainColorTwo');
        }
    }};
    box-sizing: border-box;
    z-index: 1000;
    box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.2);
    display: ${prop => (prop.open ? 'block' : 'none')};
    transform: ${prop => (prop.open ? 'translateY(0px)' : 'none')};
    animation: ${prop => (prop.open ? slideUp : 'none')} 0.5s ease;
    overflow: hidden;
`;

const SnackContentWrapper = styled(ContentWrapper)`
    padding: 0;
`;

const CenteringWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
`;

export default class SnackBar extends React.Component {
    componentDidUpdate(prevProps) {
        const { open, autoCloseAfter, onRequestClose } = this.props;
        if (open && autoCloseAfter && !prevProps.open) {
            setTimeout(() => {
                onRequestClose();
            }, autoCloseAfter);
        }
    }

    render() {
        const {
            onRequestClose,
            children,
            color,
            open,
        } = this.props;

        if (open) {
            return (
                <SnackBarWrapper name="SnackBarWrapper" open={open} color={color}>
                    {onRequestClose && <CloseIcon onClick={onRequestClose} />}
                    <CenteringWrapper>
                        <SnackContentWrapper>{children}</SnackContentWrapper>
                    </CenteringWrapper>
                </SnackBarWrapper>
            );
        }

        return null;
    }
}

SnackBar.propTypes = {
    open: PropTypes.bool,
    autoCloseAfter: PropTypes.number,
    onRequestClose: PropTypes.func,
    children: PropTypes.node,
    color: PropTypes.string,
};

SnackBar.defaultProps = {
    open: true,
    autoCloseAfter: undefined,
    onRequestClose: undefined,
    children: '',
    color: '',
};
