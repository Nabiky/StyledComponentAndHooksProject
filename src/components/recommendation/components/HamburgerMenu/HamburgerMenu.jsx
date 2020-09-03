import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import Icon from '#lib/FontIcons';
import Popover from '#lib/Popover';
import OutsideAlerter from '#lib/OutsideAlerter';

function HamburgerMenu({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <Wrapper>
            <Icon
                size="24px"
                name="three-dot-menu-f"
                onClick={() => setOpen(!open)}
                color="theme.text-color.text-grey-4"
                title="more options"
            />

            <AdjustedPopover popLeft isDisplayed={open}>
                <OutsideAlerter onClickOutside={() => setOpen(false)}>
                    <HamburgerMenuWrapper>
                        {React.Children.map(children, child => (
                            <MenuItemWrapper>{child}</MenuItemWrapper>
                        ))}
                    </HamburgerMenuWrapper>
                </OutsideAlerter>
            </AdjustedPopover>
        </Wrapper>
    );
}

HamburgerMenu.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default HamburgerMenu;

const Wrapper = styled.div`
    position: relative;
`;

const AdjustedPopover = styled(Popover)`
    right: -24px;
`;

const HamburgerMenuWrapper = styled.div`
    width: 300px;
    padding: 32px;
`;

const MenuItemWrapper = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid ${theme('background-color.bg-grey-1')};

    &:last-child {
        border-bottom: none;
    }
`;
