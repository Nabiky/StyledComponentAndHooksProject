import styled from 'styled-components';
import { switchProp, prop } from 'styled-tools';
import sizePixelMap from '#constants/sizePixelMap';

const MarginBottomDiv = styled.div`
    margin-bottom: ${switchProp(prop('marginSize', '4'), sizePixelMap)};
`;

export default MarginBottomDiv;
