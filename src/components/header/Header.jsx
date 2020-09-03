import React from 'react';
import { Page, MapTo, withComponentMappingContext } from '@adobe/cq-react-editable-components';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import * as Text from '#lib/Text';
import CloseIcon from '#lib/CloseIcon';
import FullWidthDiv from '#lib/FullWidthDiv';
import { media } from '#constants/styleConstants';
import Icon from '#lib/FontIcons';
import OutsideAlerter from '#lib/OutsideAlerter';
import makeInitials from '#utils/makeInitials';

export default class Header extends Page {
    state= {
        showSignInNav: false,
    };

    toggleNav = () => {
        this.setState(prevState => ({ showSignInNav: !prevState.showSignInNav }));
    };

    render() {
        const { showSignInNav } = this.state;
        const {
            logoUrl, logOutUrl, title, firstName, lastName,
        } = this.props;

        const initials = makeInitials(firstName, lastName);
        return (
            <HeaderWrapper>
                <LeftSection>
                    <a href={logoUrl}>
                        <SparkLogo />
                    </a>
                    <TextSeperator />
                    <Heading>{title}</Heading>
                </LeftSection>
                <RightSection>
                    <ColouredCircle onClick={this.toggleNav}>
                        <Text.Caption1>{initials}</Text.Caption1>
                    </ColouredCircle>

                    <OutsideAlerter onClickOutside={() => this.setState({ showSignInNav: false })}>
                        <SignInNav open={showSignInNav}>
                            <CloseIconExtended onClick={this.toggleNav} />

                            <SignInNavContentWrapper>
                                <UserInfo>
                                    <ColouredCircle onClick={this.toggleNav}>
                                        <Text.Caption3>{initials}</Text.Caption3>
                                    </ColouredCircle>
                                    <UserName>{`${firstName} ${lastName}`}</UserName>
                                </UserInfo>
                                <LogoutWrapper>
                                    <Icon
                                        name="logout"
                                        color="theme.background-color.bg-grey-2"
                                        size="24px"
                                        cursor="pointer"
                                    />
                                    <Logout as="a" href={logOutUrl}>Log out</Logout>
                                </LogoutWrapper>
                            </SignInNavContentWrapper>
                        </SignInNav>
                    </OutsideAlerter>
                </RightSection>
            </HeaderWrapper>
        );
    }
}

MapTo('mysparkdigital/common/components/structure/header')(
    withComponentMappingContext(Header),
);

const SignInNav = styled.div`
    display: ${props => (props.open ? 'flex' : 'none')};
    background-color: ${theme('background-color.bg-white')};
    z-index: 9999;
    overflow: hidden;
    transition: all 300ms;

    ${media.desktop} {
        position: absolute;
        min-width: 256px;
        min-height: 227px;
        right: 36px;
        top: 36px;
        box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 0.2);
    }

    ${media.mobile} {
        position: fixed;
        width: 100vw;
        height: 100vh;
        max-height: 4000px;
        left: 0;
        top: 0;
    }
`;

const HeaderWrapper = styled(FullWidthDiv)`
    display: flex;
    justify-content: space-between;
    background-color: ${theme('background-color.bg-white')};
    height: 72px;
    border-bottom: 2px solid ${theme('background-color.bg-grey-1')};
    padding: 0px 16px;
    box-sizing: border-box;
`;

const SparkLogo = styled.img.attrs({
    src: '/manageddata/content/dam/sparkdigital/images/logo/pink.svg',
})`
    height: 36px;
    margin-right: 24px;
`;

const TextSeperator = styled.div`
    height: 22px;
    width: 5px;
    border-left: solid 1px ${theme('background-color.bg-grey-2')};

    ${media.mobile} {
        display: none;
    }
`;

const LeftSection = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

const RightSection = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Heading = styled(Text.H5)`
    color: ${theme('mainColorTwo')};
    width: 100%;
    margin-left: 24px;

    ${media.mobile} {
        display: none;
    }
`;

const ColouredCircle = styled.div`
    background: ${theme('mainColorOne')};
    border-radius: 50%;
    box-sizing: border-box;
    height: 32px;
    width: 32px;
    color: ${theme('text-color.text-white')};
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
`;

const CloseIconExtended = styled(CloseIcon)`
    display: none;

    ${media.mobile} {
        display: block;
        margin-bottom: 48px;
    }
`;

const LogoutWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 8px 24px;
    cursor: pointer;
    border-top: 1px solid ${theme('background-color.bg-grey-1')};

    ${media.mobile} {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 48px;
        padding: 12px 24px;
    }
`;

const UserName = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-4')};
`;
const Logout = styled(Text.Body2)`
    margin-left: 8px;
    color: ${theme('text-color.interaction-color')};
`;

const SignInNavContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    align-content: center;

    ${media.tablet} {
        width: 100%;
    }

    ${media.mobile} {
        top: 80px;
        box-shadow: none;
    }
`;

const UserInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 24px;
    width: 100%;
    border-bottom: 1px solid ${theme('background-color.bg-grey-1')};
`;
