import React from 'react';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CloseIcon from '#lib/CloseIcon';
import GiantFullScreenDiv from '#lib/GiantFullScreenDiv';
import { media } from '#constants/styleConstants';


const Popup = ({ open, onRequestClose, children }) => open && (
    <PopupWrapper>
        <Background onClick={onRequestClose} />
        <ContentWrapper open={open}>
            <CloseIcon onClick={onRequestClose} />
            {children}
        </ContentWrapper>
    </PopupWrapper>
);

export default Popup;

const PopupWrapper = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
`;

const Background = styled(GiantFullScreenDiv)`
    background-color: ${props => rgba(props.theme.white, 0.75)};
`;

const ContentWrapper = styled.div`
    position: relative;
    min-width: 450px;
    max-height: 100vh;
    box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.2);
    background-color: ${props => props.theme.white};
    opacity: 1;
    padding: 90px 40px 60px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    height: min-content;
    width: min-content;
    overflow: auto;

    ${media.mobile} {
        width: 100%;
        height: 100%;
    }
`;

Popup.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

Popup.defaultProps = {
    open: false,
    children: '',
};
