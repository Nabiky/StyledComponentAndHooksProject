import styled from 'styled-components';
import { desktopContentWidth, media } from '#constants/styleConstants';

const ContentWrapper = styled.div`
    max-width: ${desktopContentWidth}px;
    margin: 0 auto;
    padding: 64px 0;
    width: 100%;
    position: relative;
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

export default ContentWrapper;
