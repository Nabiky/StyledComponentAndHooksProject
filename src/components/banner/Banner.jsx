import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from 'styled-tools';
import { MapTo, withComponentMappingContext } from '@adobe/cq-react-editable-components';
import * as Text from '#lib/Text';
import FullWidthDiv from '#lib/FullWidthDiv';
import { media, desktopContentWidth } from '#constants/styleConstants';

const Banner = ({ welcomeTitle, firstName, lastName }) => (
    <BannerWrapper>
        <AutoMarginWrapper>
            <Greeting>{welcomeTitle}</Greeting>
            <Name>
                {`${firstName} ${lastName}`}
            </Name>
        </AutoMarginWrapper>
    </BannerWrapper>
);

export default Banner;

MapTo('mysparkdigital/common/components/content/welcome')(withComponentMappingContext(Banner));

const BannerWrapper = styled(FullWidthDiv)`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    height: 164px;
    padding: 24px 0px;
    background-color: ${theme('mainColorOne')};
    position: relative;

    ${media.tablet} {
        height: 128px;
    }
`;

const Greeting = styled(Text.H3)`
    color: ${theme('text-color.text-white')};
`;

const Name = styled(Text.H1)`
    color: ${theme('text-color.text-white')};
`;

const AutoMarginWrapper = styled.div`
    max-width: ${desktopContentWidth}px;
    margin: 0 auto;
    padding: 0px;
    width: 100%;
    position: relative;
    box-sizing: border-box;

    ${media.desktopMini} {
        padding: 56px 40px;
    }
    ${media.tablet} {
        padding: 32px 40px;
    }
    ${media.mobile} {
        padding: 32px 24px;
    }
`;

Banner.propTypes = {
    welcomeTitle: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
};

Banner.defaultProps = {
    welcomeTitle: '<welcomeTitle>',
    firstName: '<firstName>',
    lastName: '<lastName>',
};
