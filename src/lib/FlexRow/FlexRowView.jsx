import styled from 'styled-components';
import { switchProp, prop } from 'styled-tools';
import sizePixelMap from '#constants/sizePixelMap';
import { media } from '#constants/styleConstants';

const FlexRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    > * {
        margin-right: ${switchProp(prop('desktopSpacing', '4'), sizePixelMap)};

        &:last-child {
            margin-right: 0;
        }

        ${media.tablet} {
            margin-right: ${switchProp(prop('tabletSpacing', '4'), sizePixelMap)};
        }
    }
`;

export default FlexRow;
